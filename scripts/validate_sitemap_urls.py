#!/usr/bin/env python3
"""
Sitemap URL Validator for Next.js with i18n

This script validates all URLs in dynamically generated sitemaps,
handling internationalization, redirects, and providing comprehensive reporting.

Features:
- Fetches and validates all sitemap segments
- Handles i18n redirects (Spanish default, English /en prefix)
- Validates hreflang alternate links
- Detects redirect chains and loops
- Checks for 404s and other HTTP errors
- Generates detailed reports for Google Search Console submission
- Optimized with async/await for parallel processing

Usage:
    python scripts/validate_sitemap_urls.py                           # localhost:3000
    python scripts/validate_sitemap_urls.py --url http://localhost:3000
    python scripts/validate_sitemap_urls.py --url https://yoursite.com
    python scripts/validate_sitemap_urls.py --url https://yoursite.com --verbose
    python scripts/validate_sitemap_urls.py --url https://yoursite.com --output report.json
    python scripts/validate_sitemap_urls.py --url https://yoursite.com --concurrency 20
"""

import argparse
import asyncio
import json
import sys
import time
import xml.etree.ElementTree as ET
from collections import defaultdict
from dataclasses import dataclass, field, asdict
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple
from urllib.parse import urljoin, urlparse

try:
    import httpx
except ImportError:
    print("Error: Required package 'httpx' not found.")
    print("Please install it with: pip install httpx")
    sys.exit(1)

try:
    from rich.console import Console
    from rich.table import Table
    from rich.progress import Progress, SpinnerColumn, TextColumn
    from rich.panel import Panel
    from rich import print as rprint
    HAS_RICH = True
except ImportError:
    HAS_RICH = False
    print("Warning: 'rich' package not found. Install it for better output: pip install rich")


# Constants
SITEMAP_SEGMENTS = ["pages", "articles", "works", "legal"]
LOCALES = ["en", "es"]
DEFAULT_LOCALE = "es"
TIMEOUT = 30
MAX_REDIRECTS = 10
USER_AGENT = "Mozilla/5.0 (compatible; SitemapValidator/1.0)"
DEFAULT_CONCURRENCY = 20  # Number of concurrent requests


@dataclass
class URLResult:
    """Result of URL validation"""
    url: str
    status_code: Optional[int] = None
    final_url: Optional[str] = None
    redirect_chain: List[str] = field(default_factory=list)
    response_time: Optional[float] = None
    error: Optional[str] = None
    content_type: Optional[str] = None
    hreflang_links: List[Dict[str, str]] = field(default_factory=list)
    is_valid: bool = False
    warnings: List[str] = field(default_factory=list)


@dataclass
class SitemapResult:
    """Result of sitemap validation"""
    segment: str
    total_urls: int
    valid_urls: int
    failed_urls: int
    redirect_urls: int
    url_results: List[URLResult] = field(default_factory=list)
    errors: List[str] = field(default_factory=list)


@dataclass
class ValidationReport:
    """Complete validation report"""
    base_url: str
    timestamp: str
    total_urls: int
    valid_urls: int
    failed_urls: int
    redirect_urls: int
    sitemap_results: List[SitemapResult] = field(default_factory=list)
    hreflang_issues: List[str] = field(default_factory=list)
    redirect_loops: List[str] = field(default_factory=list)
    execution_time: Optional[float] = None


class SitemapValidator:
    """Validates sitemap URLs with i18n support using async/await"""

    def __init__(self, base_url: str, verbose: bool = False, concurrency: int = DEFAULT_CONCURRENCY):
        self.base_url = base_url.rstrip('/')
        self.verbose = verbose
        self.console = Console() if HAS_RICH else None
        self.concurrency = concurrency
        self.semaphore = asyncio.Semaphore(concurrency)
        self.url_cache: Dict[str, URLResult] = {}
        self._client: Optional[httpx.AsyncClient] = None

    async def _get_client(self) -> httpx.AsyncClient:
        """Get or create async HTTP client"""
        if self._client is None:
            # Configure connection limits and timeouts
            limits = httpx.Limits(max_keepalive_connections=20, max_connections=100)
            timeout = httpx.Timeout(TIMEOUT, connect=10.0)
            
            self._client = httpx.AsyncClient(
                limits=limits,
                timeout=timeout,
                follow_redirects=True,
                max_redirects=MAX_REDIRECTS,
                headers={"User-Agent": USER_AGENT}
            )
        return self._client

    async def _close_client(self):
        """Close the HTTP client"""
        if self._client:
            await self._client.aclose()
            self._client = None

    def _log(self, message: str, style: str = ""):
        """Log message with optional Rich formatting"""
        if self.verbose:
            if HAS_RICH and self.console:
                self.console.print(message, style=style)
            else:
                print(message)

    async def fetch_sitemap_xml(self, url: str) -> Optional[str]:
        """Fetch sitemap XML content"""
        try:
            self._log(f"Fetching sitemap: {url}", "cyan")
            client = await self._get_client()
            response = await client.get(url)
            response.raise_for_status()
            
            content_type = response.headers.get('Content-Type', '')
            if 'xml' not in content_type:
                self._log(f"Warning: Unexpected content type: {content_type}", "yellow")
            
            return response.text
        except httpx.HTTPError as e:
            self._log(f"Error fetching sitemap {url}: {str(e)}", "red")
            return None

    def parse_sitemap_index(self, xml_content: str) -> List[str]:
        """Parse sitemap index to get sitemap URLs"""
        try:
            root = ET.fromstring(xml_content)
            # Handle namespace
            namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            
            sitemap_locs = []
            for sitemap in root.findall('ns:sitemap', namespace):
                loc = sitemap.find('ns:loc', namespace)
                if loc is not None and loc.text:
                    sitemap_locs.append(loc.text)
            
            return sitemap_locs
        except ET.ParseError as e:
            self._log(f"Error parsing sitemap index XML: {str(e)}", "red")
            return []

    def parse_sitemap_urls(self, xml_content: str) -> List[Dict]:
        """Parse sitemap to extract URLs and hreflang links"""
        try:
            root = ET.fromstring(xml_content)
            namespace = {
                'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
                'xhtml': 'http://www.w3.org/1999/xhtml'
            }
            
            urls = []
            for url_elem in root.findall('ns:url', namespace):
                loc = url_elem.find('ns:loc', namespace)
                if loc is None or not loc.text:
                    continue
                
                url_data = {
                    'loc': loc.text,
                    'lastmod': None,
                    'changefreq': None,
                    'priority': None,
                    'alternates': []
                }
                
                # Extract optional fields
                lastmod = url_elem.find('ns:lastmod', namespace)
                if lastmod is not None and lastmod.text:
                    url_data['lastmod'] = lastmod.text
                
                changefreq = url_elem.find('ns:changefreq', namespace)
                if changefreq is not None and changefreq.text:
                    url_data['changefreq'] = changefreq.text
                
                priority = url_elem.find('ns:priority', namespace)
                if priority is not None and priority.text:
                    url_data['priority'] = float(priority.text)
                
                # Extract hreflang alternates
                for link in url_elem.findall('xhtml:link', namespace):
                    if link.get('rel') == 'alternate':
                        url_data['alternates'].append({
                            'hreflang': link.get('hreflang', ''),
                            'href': link.get('href', '')
                        })
                
                urls.append(url_data)
            
            return urls
        except ET.ParseError as e:
            self._log(f"Error parsing sitemap XML: {str(e)}", "red")
            return []

    async def validate_url(self, url: str, check_hreflang: bool = False) -> URLResult:
        """Validate a single URL (async)"""
        # Check cache first
        if url in self.url_cache:
            return self.url_cache[url]
        
        # Use semaphore to limit concurrent requests
        async with self.semaphore:
            result = URLResult(url=url)
            
            try:
                start_time = time.time()
                client = await self._get_client()
                
                # Use GET to also validate content rendering
                # httpx automatically follows redirects
                response = await client.get(url)
                
                result.response_time = time.time() - start_time
                result.status_code = response.status_code
                result.final_url = str(response.url)
                result.content_type = response.headers.get('Content-Type', '')
                
                # Track redirect chain - if final URL differs, there was a redirect
                if result.final_url != url:
                    # Simple redirect detection - we know there was at least one redirect
                    result.redirect_chain = [url, result.final_url]
                
                # Check for success
                if 200 <= response.status_code < 300:
                    result.is_valid = True
                    
                    # Validate content type for HTML pages
                    if 'text/html' not in result.content_type and 'application/xhtml' not in result.content_type:
                        result.warnings.append(f"Unexpected content type: {result.content_type}")
                    
                    # Check if URL changed (redirect)
                    if result.final_url != url:
                        result.warnings.append(f"Redirects to: {result.final_url}")
                    
                    # Check for excessive redirects (we can't detect exact count easily with httpx)
                    # but if the chain is long, it's already handled by httpx's max_redirects
                    
                else:
                    result.is_valid = False
                    result.error = f"HTTP {response.status_code}"
                    
            except httpx.TimeoutException:
                result.error = "Request timeout"
                result.is_valid = False
            except httpx.TooManyRedirects:
                result.error = "Too many redirects (possible redirect loop)"
                result.is_valid = False
                result.redirect_chain = [url]  # At least we know it started here
            except httpx.HTTPError as e:
                result.error = str(e)
                result.is_valid = False
            
            # Cache the result
            self.url_cache[url] = result
            return result

    def validate_hreflang_links(self, url_data: Dict, url_results: Dict[str, URLResult]) -> List[str]:
        """Validate hreflang alternate links"""
        issues = []
        url = url_data['loc']
        alternates = url_data.get('alternates', [])
        
        if not alternates:
            return issues
        
        # Check that alternates exist and are valid
        hreflang_urls = {alt['hreflang']: alt['href'] for alt in alternates}
        
        # Should have alternates for both locales plus x-default
        expected_hreflangs = set(LOCALES + ['x-default'])
        actual_hreflangs = set(hreflang_urls.keys())
        
        if not actual_hreflangs:
            issues.append(f"{url}: No hreflang alternates found")
            return issues
        
        missing = expected_hreflangs - actual_hreflangs
        if missing:
            issues.append(f"{url}: Missing hreflang tags: {', '.join(missing)}")
        
        # Validate that alternate URLs are accessible
        for hreflang, href in hreflang_urls.items():
            if href in url_results:
                alt_result = url_results[href]
                if not alt_result.is_valid:
                    issues.append(f"{url}: Alternate [{hreflang}] {href} is not accessible: {alt_result.error}")
        
        # Check bidirectional links
        for hreflang, href in hreflang_urls.items():
            if hreflang == 'x-default':
                continue
            # The alternate page should link back
            # This would require fetching and parsing the alternate page's hreflang tags
            # For now, we just validate that the URL exists
            pass
        
        return issues

    async def validate_sitemap_segment(self, segment: str) -> SitemapResult:
        """Validate a single sitemap segment (async)"""
        sitemap_url = f"{self.base_url}/sitemap-{segment}.xml"
        
        if HAS_RICH and self.console:
            self.console.print(f"\n[bold cyan]Validating {segment.upper()} sitemap[/bold cyan]")
        else:
            print(f"\nValidating {segment.upper()} sitemap")
        
        result = SitemapResult(segment=segment, total_urls=0, valid_urls=0, failed_urls=0, redirect_urls=0)
        
        # Fetch sitemap
        xml_content = await self.fetch_sitemap_xml(sitemap_url)
        if not xml_content:
            result.errors.append(f"Failed to fetch sitemap: {sitemap_url}")
            return result
        
        # Parse URLs
        urls = self.parse_sitemap_urls(xml_content)
        result.total_urls = len(urls)
        
        if not urls:
            result.errors.append("No URLs found in sitemap")
            return result
        
        # Validate URLs in parallel batches
        if HAS_RICH:
            from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn
            
            progress = Progress(
                SpinnerColumn(),
                TextColumn("[progress.description]{task.description}"),
                BarColumn(),
                TaskProgressColumn(),
                console=self.console
            )
            with progress:
                task = progress.add_task(f"Checking {len(urls)} URLs...", total=len(urls))
                
                # Create all validation tasks
                validation_tasks = [
                    self.validate_url(url_data['loc']) 
                    for url_data in urls
                ]
                
                # Execute all validations in parallel
                url_results = await asyncio.gather(*validation_tasks, return_exceptions=True)
                
                # Process results
                for i, (url_data, url_result) in enumerate(zip(urls, url_results)):
                    if isinstance(url_result, Exception):
                        # Handle exceptions
                        url_result = URLResult(url=url_data['loc'], error=str(url_result), is_valid=False)
                    
                    url_result.hreflang_links = url_data.get('alternates', [])
                    result.url_results.append(url_result)
                    
                    if url_result.is_valid:
                        result.valid_urls += 1
                    else:
                        result.failed_urls += 1
                    
                    if url_result.redirect_chain:
                        result.redirect_urls += 1
                    
                    progress.update(task, advance=1)
        else:
            print(f"Checking {len(urls)} URLs in parallel (concurrency: {self.concurrency})...")
            
            # Create all validation tasks
            validation_tasks = [
                self.validate_url(url_data['loc']) 
                for url_data in urls
            ]
            
            # Execute all validations in parallel
            url_results = await asyncio.gather(*validation_tasks, return_exceptions=True)
            
            # Process results
            for url_data, url_result in zip(urls, url_results):
                if isinstance(url_result, Exception):
                    # Handle exceptions
                    url_result = URLResult(url=url_data['loc'], error=str(url_result), is_valid=False)
                
                url_result.hreflang_links = url_data.get('alternates', [])
                result.url_results.append(url_result)
                
                if url_result.is_valid:
                    result.valid_urls += 1
                else:
                    result.failed_urls += 1
                
                if url_result.redirect_chain:
                    result.redirect_urls += 1
        
        return result

    async def validate_all_sitemaps(self) -> ValidationReport:
        """Validate all sitemap segments (async)"""
        start_time = time.time()
        
        if HAS_RICH and self.console:
            self.console.print(Panel.fit(
                f"[bold]Sitemap Validation for:[/bold] [cyan]{self.base_url}[/cyan]\n"
                f"[dim]Concurrency: {self.concurrency} parallel requests[/dim]",
                border_style="blue"
            ))
        else:
            print(f"\n{'='*70}")
            print(f"Sitemap Validation for: {self.base_url}")
            print(f"Concurrency: {self.concurrency} parallel requests")
            print(f"{'='*70}")
        
        report = ValidationReport(
            base_url=self.base_url,
            timestamp=datetime.now().isoformat(),
            total_urls=0,
            valid_urls=0,
            failed_urls=0,
            redirect_urls=0
        )
        
        try:
            # Validate segments in parallel (but we can also do sequentially if preferred)
            # For now, let's do them sequentially to avoid overwhelming the server
            # but URLs within each segment are validated in parallel
            for segment in SITEMAP_SEGMENTS:
                segment_result = await self.validate_sitemap_segment(segment)
                report.sitemap_results.append(segment_result)
                report.total_urls += segment_result.total_urls
                report.valid_urls += segment_result.valid_urls
                report.failed_urls += segment_result.failed_urls
                report.redirect_urls += segment_result.redirect_urls
            
            # Build URL results map for hreflang validation
            all_url_results = {}
            for segment_result in report.sitemap_results:
                for url_result in segment_result.url_results:
                    all_url_results[url_result.url] = url_result
            
            # Validate hreflang links
            if HAS_RICH and self.console:
                self.console.print("\n[bold cyan]Validating hreflang links...[/bold cyan]")
            else:
                print("\nValidating hreflang links...")
            
            for segment_result in report.sitemap_results:
                for url_result in segment_result.url_results:
                    # We need the original URL data with alternates
                    # For now, we'll just check that alternates are accessible
                    for alt in url_result.hreflang_links:
                        alt_url = alt.get('href')
                        if alt_url and alt_url in all_url_results:
                            alt_result = all_url_results[alt_url]
                            if not alt_result.is_valid:
                                issue = f"{url_result.url}: Alternate [{alt.get('hreflang')}] {alt_url} is not accessible"
                                report.hreflang_issues.append(issue)
            
            # Check for redirect loops
            for url, result in all_url_results.items():
                if result.redirect_chain and len(result.redirect_chain) > 5:
                    report.redirect_loops.append(f"{url}: Long redirect chain ({len(result.redirect_chain)} redirects)")
        
        finally:
            # Always close the client
            await self._close_client()
        
        report.execution_time = time.time() - start_time
        
        return report

    def print_report(self, report: ValidationReport):
        """Print validation report"""
        if HAS_RICH and self.console:
            self._print_rich_report(report)
        else:
            self._print_plain_report(report)

    def _print_rich_report(self, report: ValidationReport):
        """Print report with Rich formatting"""
        console = self.console
        
        # Summary
        console.print("\n")
        summary_table = Table(title="Validation Summary", show_header=True, header_style="bold magenta")
        summary_table.add_column("Metric", style="cyan")
        summary_table.add_column("Value", style="green")
        
        summary_table.add_row("Total URLs", str(report.total_urls))
        summary_table.add_row("Valid URLs", f"[green]{report.valid_urls}[/green]")
        summary_table.add_row("Failed URLs", f"[red]{report.failed_urls}[/red]" if report.failed_urls > 0 else "0")
        summary_table.add_row("URLs with Redirects", f"[yellow]{report.redirect_urls}[/yellow]" if report.redirect_urls > 0 else "0")
        summary_table.add_row("Success Rate", f"{(report.valid_urls/report.total_urls*100):.1f}%" if report.total_urls > 0 else "0%")
        summary_table.add_row("Execution Time", f"{report.execution_time:.2f}s")
        
        console.print(summary_table)
        
        # Segment breakdown
        console.print("\n")
        segment_table = Table(title="Sitemap Segments", show_header=True, header_style="bold magenta")
        segment_table.add_column("Segment", style="cyan")
        segment_table.add_column("Total", justify="right")
        segment_table.add_column("Valid", justify="right", style="green")
        segment_table.add_column("Failed", justify="right", style="red")
        segment_table.add_column("Redirects", justify="right", style="yellow")
        
        for seg_result in report.sitemap_results:
            segment_table.add_row(
                seg_result.segment,
                str(seg_result.total_urls),
                str(seg_result.valid_urls),
                str(seg_result.failed_urls) if seg_result.failed_urls > 0 else "-",
                str(seg_result.redirect_urls) if seg_result.redirect_urls > 0 else "-"
            )
        
        console.print(segment_table)
        
        # Failed URLs
        failed_count = 0
        for seg_result in report.sitemap_results:
            failed_urls = [r for r in seg_result.url_results if not r.is_valid]
            if failed_urls:
                console.print(f"\n[bold red]Failed URLs in {seg_result.segment}:[/bold red]")
                for result in failed_urls[:10]:  # Limit to first 10
                    console.print(f"  [red]✗[/red] {result.url}")
                    console.print(f"    Error: {result.error}")
                    failed_count += 1
                if len(failed_urls) > 10:
                    console.print(f"  ... and {len(failed_urls) - 10} more")
        
        # Warnings
        warning_count = 0
        for seg_result in report.sitemap_results:
            urls_with_warnings = [r for r in seg_result.url_results if r.warnings]
            if urls_with_warnings and warning_count < 10:
                console.print(f"\n[bold yellow]Warnings in {seg_result.segment}:[/bold yellow]")
                for result in urls_with_warnings[:5]:  # Limit to first 5
                    console.print(f"  [yellow]⚠[/yellow] {result.url}")
                    for warning in result.warnings:
                        console.print(f"    {warning}")
                    warning_count += 1
                if len(urls_with_warnings) > 5:
                    console.print(f"  ... and {len(urls_with_warnings) - 5} more warnings")
        
        # Hreflang issues
        if report.hreflang_issues:
            console.print(f"\n[bold yellow]Hreflang Issues ({len(report.hreflang_issues)}):[/bold yellow]")
            for issue in report.hreflang_issues[:10]:
                console.print(f"  [yellow]⚠[/yellow] {issue}")
            if len(report.hreflang_issues) > 10:
                console.print(f"  ... and {len(report.hreflang_issues) - 10} more")
        
        # Redirect loops
        if report.redirect_loops:
            console.print(f"\n[bold red]Redirect Issues ({len(report.redirect_loops)}):[/bold red]")
            for loop in report.redirect_loops[:10]:
                console.print(f"  [red]✗[/red] {loop}")
            if len(report.redirect_loops) > 10:
                console.print(f"  ... and {len(report.redirect_loops) - 10} more")
        
        # Final status
        console.print("\n")
        if report.failed_urls == 0 and not report.hreflang_issues and not report.redirect_loops:
            console.print(Panel.fit(
                "[bold green]✓ All sitemaps are VALID and ready for Google Search Console![/bold green]",
                border_style="green"
            ))
        elif report.failed_urls == 0:
            console.print(Panel.fit(
                "[bold yellow]⚠ Sitemaps are functional but have warnings. Review before submitting to Search Console.[/bold yellow]",
                border_style="yellow"
            ))
        else:
            console.print(Panel.fit(
                "[bold red]✗ Validation FAILED. Fix errors before submitting to Google Search Console.[/bold red]",
                border_style="red"
            ))

    def _print_plain_report(self, report: ValidationReport):
        """Print report without Rich formatting"""
        print(f"\n{'='*70}")
        print("VALIDATION SUMMARY")
        print(f"{'='*70}")
        print(f"Total URLs:        {report.total_urls}")
        print(f"Valid URLs:        {report.valid_urls}")
        print(f"Failed URLs:       {report.failed_urls}")
        print(f"URLs with Redirects: {report.redirect_urls}")
        if report.total_urls > 0:
            print(f"Success Rate:      {(report.valid_urls/report.total_urls*100):.1f}%")
        print(f"Execution Time:    {report.execution_time:.2f}s")
        
        print(f"\n{'='*70}")
        print("SITEMAP SEGMENTS")
        print(f"{'='*70}")
        for seg_result in report.sitemap_results:
            print(f"{seg_result.segment:12} | Total: {seg_result.total_urls:4} | Valid: {seg_result.valid_urls:4} | Failed: {seg_result.failed_urls:4} | Redirects: {seg_result.redirect_urls:4}")
        
        # Failed URLs
        for seg_result in report.sitemap_results:
            failed_urls = [r for r in seg_result.url_results if not r.is_valid]
            if failed_urls:
                print(f"\nFailed URLs in {seg_result.segment}:")
                for result in failed_urls[:10]:
                    print(f"  ✗ {result.url}")
                    print(f"    Error: {result.error}")
                if len(failed_urls) > 10:
                    print(f"  ... and {len(failed_urls) - 10} more")
        
        # Final status
        print(f"\n{'='*70}")
        if report.failed_urls == 0:
            print("✓ All sitemaps are VALID!")
        else:
            print("✗ Validation FAILED - see errors above")
        print(f"{'='*70}\n")

    def save_report(self, report: ValidationReport, output_file: str):
        """Save report to JSON file"""
        # Convert dataclasses to dict
        report_dict = {
            'base_url': report.base_url,
            'timestamp': report.timestamp,
            'total_urls': report.total_urls,
            'valid_urls': report.valid_urls,
            'failed_urls': report.failed_urls,
            'redirect_urls': report.redirect_urls,
            'execution_time': report.execution_time,
            'sitemap_results': [],
            'hreflang_issues': report.hreflang_issues,
            'redirect_loops': report.redirect_loops
        }
        
        for seg_result in report.sitemap_results:
            seg_dict = {
                'segment': seg_result.segment,
                'total_urls': seg_result.total_urls,
                'valid_urls': seg_result.valid_urls,
                'failed_urls': seg_result.failed_urls,
                'redirect_urls': seg_result.redirect_urls,
                'errors': seg_result.errors,
                'url_results': []
            }
            
            for url_result in seg_result.url_results:
                seg_dict['url_results'].append({
                    'url': url_result.url,
                    'status_code': url_result.status_code,
                    'final_url': url_result.final_url,
                    'redirect_chain': url_result.redirect_chain,
                    'response_time': url_result.response_time,
                    'error': url_result.error,
                    'content_type': url_result.content_type,
                    'is_valid': url_result.is_valid,
                    'warnings': url_result.warnings,
                    'hreflang_links': url_result.hreflang_links
                })
            
            report_dict['sitemap_results'].append(seg_dict)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report_dict, f, indent=2, ensure_ascii=False)
        
        print(f"\nReport saved to: {output_file}")


async def main_async():
    """Async main entry point"""
    parser = argparse.ArgumentParser(
        description='Validate Next.js sitemap URLs with i18n support (async/parallel)',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/validate_sitemap_urls.py
  python scripts/validate_sitemap_urls.py --url http://localhost:3000
  python scripts/validate_sitemap_urls.py --url https://yoursite.com --verbose
  python scripts/validate_sitemap_urls.py --url https://yoursite.com --output report.json
  python scripts/validate_sitemap_urls.py --url https://yoursite.com --concurrency 30
        """
    )
    
    parser.add_argument(
        '--url',
        default='http://localhost:3000',
        help='Base URL of the site (default: http://localhost:3000)'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Enable verbose output'
    )
    parser.add_argument(
        '--output', '-o',
        help='Save detailed report to JSON file'
    )
    parser.add_argument(
        '--concurrency', '-c',
        type=int,
        default=DEFAULT_CONCURRENCY,
        help=f'Number of concurrent requests (default: {DEFAULT_CONCURRENCY})'
    )
    
    args = parser.parse_args()
    
    # Normalize URL
    base_url = args.url.rstrip('/')
    
    # Create validator
    validator = SitemapValidator(base_url, verbose=args.verbose, concurrency=args.concurrency)
    
    # Run validation
    try:
        report = await validator.validate_all_sitemaps()
        
        # Print report
        validator.print_report(report)
        
        # Save to file if requested
        if args.output:
            validator.save_report(report, args.output)
        
        # Exit with appropriate code
        return 0 if report.failed_urls == 0 else 1
        
    except KeyboardInterrupt:
        print("\n\nValidation interrupted by user")
        return 130
    except Exception as e:
        print(f"\nFATAL ERROR: {str(e)}", file=sys.stderr)
        if args.verbose:
            import traceback
            traceback.print_exc()
        return 1


def main():
    """Main entry point wrapper for asyncio"""
    exit_code = asyncio.run(main_async())
    sys.exit(exit_code)


if __name__ == '__main__':
    main()

