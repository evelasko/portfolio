#!/usr/bin/env python3
"""
Translation Status Discovery Script

This script provides detailed translation status information for articles.
It outputs structured JSON that can be consumed by agents or other tools.

Usage:
    python scripts/get_translation_status.py [options]

Options:
    --format json|table     Output format (default: json)
    --missing-only          Show only untranslated articles
    --validate              Validate existing translations
    --help                  Show this help message

Output (JSON):
    {
      "total_en": 22,
      "total_es": 6,
      "missing": 16,
      "missing_slugs": ["article-1", "article-2", ...],
      "translated": [
        {"en_slug": "hello-world", "es_slug": "hola-mundo"},
        ...
      ],
      "issues": [...]
    }
"""

import argparse
import json
import sys
from pathlib import Path
from typing import Dict, List, Optional, Set

try:
    import frontmatter
    from rich.console import Console
    from rich.table import Table
except ImportError:
    print("Error: Required dependencies not installed", file=sys.stderr)
    print("Run: pip install -r scripts/requirements.txt", file=sys.stderr)
    sys.exit(1)

# Initialize console for table output
console = Console()


class TranslationStatusAnalyzer:
    """Analyzes translation status of articles."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.en_dir = project_root / "src" / "content" / "articles" / "en"
        self.es_dir = project_root / "src" / "content" / "articles" / "es"

    def get_article_metadata(self, file_path: Path) -> Dict:
        """Extract metadata from an article file."""
        with open(file_path, "r", encoding="utf-8") as f:
            post = frontmatter.load(f)

        return {
            "slug": file_path.stem,
            "title": post.metadata.get("title", ""),
            "category": post.metadata.get("category", ""),
            "publishedAt": post.metadata.get("publishedAt", ""),
            "alternateLocales": post.metadata.get("alternateLocales", {}),
        }

    def get_all_en_articles(self) -> Dict[str, Dict]:
        """Get all English articles with metadata."""
        articles = {}
        if not self.en_dir.exists():
            return articles

        for file_path in sorted(self.en_dir.glob("*.mdx")):
            metadata = self.get_article_metadata(file_path)
            articles[metadata["slug"]] = metadata

        return articles

    def get_all_es_articles(self) -> Dict[str, Dict]:
        """Get all Spanish articles with metadata."""
        articles = {}
        if not self.es_dir.exists():
            return articles

        for file_path in sorted(self.es_dir.glob("*.mdx")):
            metadata = self.get_article_metadata(file_path)
            articles[metadata["slug"]] = metadata

        return articles

    def analyze_status(self, validate: bool = False) -> Dict:
        """
        Analyze translation status.

        Args:
            validate: Whether to validate existing translations

        Returns:
            Dictionary with comprehensive status information
        """
        en_articles = self.get_all_en_articles()
        es_articles = self.get_all_es_articles()

        # Find translated and missing articles
        translated = []
        missing = []
        issues = []

        for en_slug, en_meta in en_articles.items():
            es_slug = en_meta.get("alternateLocales", {}).get("es")

            if es_slug:
                # Article has translation reference
                if es_slug in es_articles:
                    # Translation exists
                    es_meta = es_articles[es_slug]
                    translated.append({
                        "en_slug": en_slug,
                        "es_slug": es_slug,
                        "en_title": en_meta["title"],
                        "es_title": es_meta["title"],
                        "category_en": en_meta["category"],
                        "category_es": es_meta["category"],
                    })

                    # Validate if requested
                    if validate:
                        validation_issues = self._validate_translation(
                            en_slug, en_meta, es_slug, es_meta
                        )
                        if validation_issues:
                            issues.extend(validation_issues)
                else:
                    # Translation reference exists but file missing
                    issues.append({
                        "type": "missing_file",
                        "en_slug": en_slug,
                        "es_slug": es_slug,
                        "message": f"English article references '{es_slug}' but Spanish file doesn't exist",
                    })
                    missing.append(en_slug)
            else:
                # No translation reference
                missing.append(en_slug)

        # Check for orphaned Spanish articles
        referenced_es_slugs = {t["es_slug"] for t in translated}
        for es_slug in es_articles.keys():
            if es_slug not in referenced_es_slugs:
                issues.append({
                    "type": "orphaned_translation",
                    "es_slug": es_slug,
                    "message": f"Spanish article '{es_slug}' has no English reference",
                })

        return {
            "total_en": len(en_articles),
            "total_es": len(es_articles),
            "translated_count": len(translated),
            "missing_count": len(missing),
            "missing_slugs": sorted(missing),
            "translated": translated,
            "issues": issues,
        }

    def _validate_translation(
        self, en_slug: str, en_meta: Dict, es_slug: str, es_meta: Dict
    ) -> List[Dict]:
        """
        Validate a translation pair.

        Args:
            en_slug: English slug
            en_meta: English metadata
            es_slug: Spanish slug
            es_meta: Spanish metadata

        Returns:
            List of validation issues
        """
        issues = []

        # Check bidirectional reference
        es_en_ref = es_meta.get("alternateLocales", {}).get("en")
        if es_en_ref != en_slug:
            issues.append({
                "type": "broken_cross_reference",
                "en_slug": en_slug,
                "es_slug": es_slug,
                "message": f"Spanish article doesn't reference '{en_slug}' (references '{es_en_ref}')",
            })

        # Check publishedAt consistency
        if en_meta.get("publishedAt") != es_meta.get("publishedAt"):
            issues.append({
                "type": "date_mismatch",
                "en_slug": en_slug,
                "es_slug": es_slug,
                "message": "publishedAt dates don't match",
            })

        return issues


def output_json(status: Dict):
    """Output status as JSON."""
    print(json.dumps(status, indent=2, ensure_ascii=False))


def output_table(status: Dict):
    """Output status as formatted table."""
    console.print(f"\n[bold cyan]Article Translation Status[/bold cyan]\n")

    # Summary table
    summary_table = Table(show_header=True, header_style="bold magenta")
    summary_table.add_column("Metric", style="cyan")
    summary_table.add_column("Count", justify="right", style="green")

    summary_table.add_row("Total English Articles", str(status["total_en"]))
    summary_table.add_row("Total Spanish Articles", str(status["total_es"]))
    summary_table.add_row("Translated", str(status["translated_count"]))
    summary_table.add_row("Missing Translations", str(status["missing_count"]))
    summary_table.add_row("Issues Found", str(len(status["issues"])))

    console.print(summary_table)

    # Missing translations
    if status["missing_slugs"]:
        console.print(f"\n[bold yellow]Missing Translations ({len(status['missing_slugs'])})[/bold yellow]\n")
        for slug in status["missing_slugs"][:10]:  # Show first 10
            console.print(f"  • {slug}")
        if len(status["missing_slugs"]) > 10:
            console.print(f"  ... and {len(status['missing_slugs']) - 10} more")

    # Issues
    if status["issues"]:
        console.print(f"\n[bold red]Issues ({len(status['issues'])})[/bold red]\n")
        for issue in status["issues"][:5]:  # Show first 5
            console.print(f"  [red]•[/red] [{issue['type']}] {issue['message']}")
        if len(status["issues"]) > 5:
            console.print(f"  ... and {len(status['issues']) - 5} more")

    # Success message
    if status["missing_count"] == 0 and len(status["issues"]) == 0:
        console.print(f"\n[green]✓ All articles translated with no issues![/green]\n")


def output_missing_only(status: Dict):
    """Output only missing article slugs (one per line)."""
    for slug in status["missing_slugs"]:
        print(slug)


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Get article translation status",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )

    parser.add_argument(
        "--format",
        choices=["json", "table"],
        default="json",
        help="Output format (default: json)",
    )

    parser.add_argument(
        "--missing-only",
        action="store_true",
        help="Output only missing article slugs (one per line)",
    )

    parser.add_argument(
        "--validate",
        action="store_true",
        help="Validate existing translations for issues",
    )

    args = parser.parse_args()

    # Get project root
    project_root = Path(__file__).parent.parent.absolute()

    # Analyze status
    analyzer = TranslationStatusAnalyzer(project_root)
    status = analyzer.analyze_status(validate=args.validate)

    # Output
    if args.missing_only:
        output_missing_only(status)
    elif args.format == "json":
        output_json(status)
    else:  # table
        output_table(status)


if __name__ == "__main__":
    main()