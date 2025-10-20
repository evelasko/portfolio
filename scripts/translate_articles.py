#!/usr/bin/env python3
"""
Article Translation Script for Enrique Velasco Portfolio

This script automates the translation of English articles to Spanish using the DeepL API.
It handles MDX frontmatter, preserves code blocks, respects non-translatable terms,
and maintains cross-language references.

Usage:
    python scripts/translate_articles.py [options]

Options:
    --dry-run           Simulate translation without writing files
    --article SLUG      Translate specific article by slug
    --force             Force re-translation of existing articles
    --verbose           Enable verbose logging
    --help              Show this help message

Requirements:
    - Python 3.8+
    - DeepL API key (set in .env as DEEPL_API_KEY)
    - See requirements.txt for dependencies
"""

import argparse
import json
import logging
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple
from unicodedata import normalize

import deepl
import frontmatter
from dotenv import load_dotenv
from rich.console import Console
from rich.logging import RichHandler
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table

# Initialize rich console for beautiful output
console = Console()

# Configure logging with rich handler
logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
    datefmt="[%X]",
    handlers=[RichHandler(console=console, rich_tracebacks=True)],
)
logger = logging.getLogger(__name__)


@dataclass
class TranslationConfig:
    """Configuration for translation process."""

    non_translatable_terms: List[str]
    formality: str
    preserve_formatting: bool
    target_language: str
    # Note: Categories are now locale-independent keys, no translation needed


@dataclass
class ArticleMetadata:
    """Metadata for an article."""

    slug: str
    file_path: Path
    frontmatter: Dict
    content: str
    has_translation: bool
    translation_slug: Optional[str] = None


class SlugGenerator:
    """Generates Spanish slugs from English slugs or titles."""

    # Common word translations for slug generation
    COMMON_TRANSLATIONS = {
        "and": "y",
        "or": "o",
        "the": "el",
        "to": "a",
        "from": "de",
        "in": "en",
        "on": "en",
        "at": "en",
        "for": "para",
        "with": "con",
        "as": "como",
        "by": "por",
        "when": "cuando",
        "what": "que",
        "how": "como",
        "why": "por-que",
        "building": "construyendo",
        "creating": "creando",
        "learning": "aprendiendo",
        "teaching": "ensenando",
        "exploring": "explorando",
        "understanding": "entendiendo",
        "thinking": "pensando",
        "working": "trabajando",
        "creative": "creativo",
        "technology": "tecnologia",
        "community": "comunidad",
        "systems": "sistemas",
        "tools": "herramientas",
        "practices": "practicas",
        "principles": "principios",
        "frameworks": "marcos",
        "career": "carrera",
        "work": "trabajo",
        "thinking": "pensamiento",
        "philosophy": "filosofia",
        "data": "datos",
        "failure": "fracaso",
        "stage": "escenario",
        "screen": "pantalla",
        "real-time": "tiempo-real",
    }

    @staticmethod
    def normalize_slug(text: str) -> str:
        """Normalize text to slug format."""
        # Convert to lowercase
        text = text.lower()
        # Remove accents
        text = normalize("NFKD", text).encode("ASCII", "ignore").decode("ASCII")
        # Replace spaces and underscores with hyphens
        text = re.sub(r"[\s_]+", "-", text)
        # Remove any character that isn't alphanumeric or hyphen
        text = re.sub(r"[^a-z0-9-]", "", text)
        # Remove consecutive hyphens
        text = re.sub(r"-+", "-", text)
        # Remove leading/trailing hyphens
        text = text.strip("-")
        return text

    @classmethod
    def generate_from_english(cls, english_slug: str) -> str:
        """Generate Spanish slug from English slug using common translations."""
        parts = english_slug.split("-")
        translated_parts = []

        for part in parts:
            # Use common translation if available, otherwise keep original
            translated_part = cls.COMMON_TRANSLATIONS.get(part, part)
            translated_parts.append(translated_part)

        return "-".join(translated_parts)

    @classmethod
    def generate_from_title(cls, spanish_title: str) -> str:
        """Generate slug from Spanish title."""
        return cls.normalize_slug(spanish_title)


class ArticleTranslator:
    """Handles translation of articles using DeepL API."""

    def __init__(
        self,
        config: TranslationConfig,
        deepl_client: deepl.Translator,
        dry_run: bool = False,
    ):
        self.config = config
        self.deepl = deepl_client
        self.dry_run = dry_run
        self.slug_generator = SlugGenerator()

        # Compile regex patterns for non-translatable terms
        self._compile_protection_patterns()

    def _compile_protection_patterns(self):
        """Compile regex patterns to protect non-translatable content."""
        # Create pattern to match non-translatable terms (case-insensitive)
        terms = "|".join(re.escape(term) for term in self.config.non_translatable_terms)
        self.protected_terms_pattern = re.compile(f"\\b({terms})\\b", re.IGNORECASE)

        # Patterns for code blocks and MDX components
        self.code_block_pattern = re.compile(r"```[\s\S]*?```", re.MULTILINE)
        self.inline_code_pattern = re.compile(r"`[^`]+`")
        self.mdx_component_pattern = re.compile(r"<[A-Z][^>]*>.*?</[A-Z][^>]*>", re.DOTALL)
        self.url_pattern = re.compile(r"https?://[^\s\)]+")

    def _protect_content(self, text: str) -> Tuple[str, Dict[str, str]]:
        """
        Replace protected content with placeholders.
        Returns modified text and mapping of placeholders to original content.
        """
        placeholders = {}
        counter = 0

        def create_placeholder(match: re.Match) -> str:
            nonlocal counter
            placeholder = f"__PROTECTED_{counter}__"
            placeholders[placeholder] = match.group(0)
            counter += 1
            return placeholder

        # Protect code blocks (must be first to avoid nested protection)
        text = self.code_block_pattern.sub(create_placeholder, text)

        # Protect inline code
        text = self.inline_code_pattern.sub(create_placeholder, text)

        # Protect MDX components
        text = self.mdx_component_pattern.sub(create_placeholder, text)

        # Protect URLs
        text = self.url_pattern.sub(create_placeholder, text)

        # Protect non-translatable terms
        text = self.protected_terms_pattern.sub(create_placeholder, text)

        return text, placeholders

    def _restore_content(self, text: str, placeholders: Dict[str, str]) -> str:
        """Restore protected content from placeholders."""
        for placeholder, original in placeholders.items():
            text = text.replace(placeholder, original)
        return text

    def translate_text(self, text: str) -> str:
        """
        Translate text while preserving protected content.

        Args:
            text: Text to translate

        Returns:
            Translated text with protected content restored
        """
        if not text or not text.strip():
            return text

        # Protect special content
        protected_text, placeholders = self._protect_content(text)

        # Translate using DeepL
        try:
            result = self.deepl.translate_text(
                protected_text,
                target_lang=self.config.target_language.upper(),
                formality=self.config.formality,
                preserve_formatting=self.config.preserve_formatting,
            )
            translated = result.text
        except Exception as e:
            logger.error(f"DeepL translation failed: {e}")
            raise

        # Restore protected content
        translated = self._restore_content(translated, placeholders)

        return translated

    def translate_frontmatter(self, frontmatter_data: Dict) -> Dict:
        """
        Translate frontmatter fields.

        Args:
            frontmatter_data: Original frontmatter dictionary

        Returns:
            Translated frontmatter dictionary
        """
        translated = frontmatter_data.copy()

        # Fields to translate
        if "title" in translated:
            translated["title"] = self.translate_text(translated["title"])

        if "description" in translated:
            translated["description"] = self.translate_text(translated["description"])

        # Category is now a key (locale-independent), so it doesn't need translation
        # It remains the same across all locales (e.g., "art-technology")
        if "category" in translated:
            logger.debug(f"Category key preserved: {translated['category']}")
            # No translation needed - category is already a key

        if "tags" in translated and isinstance(translated["tags"], list):
            # Translate each tag individually
            translated_tags = []
            for tag in translated["tags"]:
                # Check if tag is in non-translatable terms
                if tag in self.config.non_translatable_terms:
                    translated_tags.append(tag)
                else:
                    translated_tags.append(self.translate_text(tag))
            translated["tags"] = translated_tags

        return translated

    def generate_spanish_slug(
        self, english_slug: str, spanish_title: str
    ) -> str:
        """
        Generate Spanish slug for the article.

        Uses a combination of intelligent translation and title-based generation.

        Args:
            english_slug: Original English slug
            spanish_title: Translated Spanish title

        Returns:
            Spanish slug
        """
        # Try intelligent translation first
        slug_from_english = self.slug_generator.generate_from_english(english_slug)

        # Also generate from title
        slug_from_title = self.slug_generator.generate_from_title(spanish_title)

        # Prefer title-based slug if it's significantly different and more descriptive
        # Otherwise use the English-based translation
        if len(slug_from_title) > len(slug_from_english) * 0.8:
            return slug_from_title
        else:
            return slug_from_english

    def translate_article(
        self, article: ArticleMetadata, spanish_slug: Optional[str] = None
    ) -> Tuple[Dict, str, str]:
        """
        Translate entire article.

        Args:
            article: Article metadata
            spanish_slug: Optional custom Spanish slug

        Returns:
            Tuple of (translated_frontmatter, translated_content, spanish_slug)
        """
        logger.info(f"Translating article: {article.slug}")

        # Translate frontmatter
        translated_frontmatter = self.translate_frontmatter(article.frontmatter)

        # Generate Spanish slug
        if not spanish_slug:
            spanish_slug = self.generate_spanish_slug(
                article.slug, translated_frontmatter["title"]
            )

        # Add cross-reference to English version
        if "alternateLocales" not in translated_frontmatter:
            translated_frontmatter["alternateLocales"] = {}
        translated_frontmatter["alternateLocales"]["en"] = article.slug

        # Translate content
        translated_content = self.translate_text(article.content)

        logger.info(f"Translation complete: {article.slug} → {spanish_slug}")

        return translated_frontmatter, translated_content, spanish_slug


class ArticleManager:
    """Manages article files and translations."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.en_dir = project_root / "src" / "content" / "articles" / "en"
        self.es_dir = project_root / "src" / "content" / "articles" / "es"

        # Ensure directories exist
        self.en_dir.mkdir(parents=True, exist_ok=True)
        self.es_dir.mkdir(parents=True, exist_ok=True)

    def load_article(self, file_path: Path) -> ArticleMetadata:
        """Load article from MDX file."""
        with open(file_path, "r", encoding="utf-8") as f:
            post = frontmatter.load(f)

        slug = file_path.stem
        has_translation = False
        translation_slug = None

        # Check if article has translation reference
        if "alternateLocales" in post.metadata and "es" in post.metadata["alternateLocales"]:
            translation_slug = post.metadata["alternateLocales"]["es"]
            spanish_file = self.es_dir / f"{translation_slug}.mdx"
            has_translation = spanish_file.exists()

        return ArticleMetadata(
            slug=slug,
            file_path=file_path,
            frontmatter=post.metadata,
            content=post.content,
            has_translation=has_translation,
            translation_slug=translation_slug,
        )

    def get_all_english_articles(self) -> List[ArticleMetadata]:
        """Get all English articles."""
        articles = []
        for file_path in sorted(self.en_dir.glob("*.mdx")):
            articles.append(self.load_article(file_path))
        return articles

    def get_untranslated_articles(self) -> List[ArticleMetadata]:
        """Get articles without Spanish translations."""
        all_articles = self.get_all_english_articles()
        return [article for article in all_articles if not article.has_translation]

    def save_spanish_article(
        self,
        spanish_slug: str,
        frontmatter_data: Dict,
        content: str,
        dry_run: bool = False,
    ) -> Path:
        """Save translated article to Spanish directory."""
        output_path = self.es_dir / f"{spanish_slug}.mdx"

        if dry_run:
            logger.info(f"[DRY RUN] Would save to: {output_path}")
            return output_path

        # Create frontmatter post
        post = frontmatter.Post(content, **frontmatter_data)

        # Write to file
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(frontmatter.dumps(post))

        logger.info(f"Saved Spanish article: {output_path}")
        return output_path

    def update_english_article_reference(
        self, article: ArticleMetadata, spanish_slug: str, dry_run: bool = False
    ):
        """Update English article with reference to Spanish translation."""
        if dry_run:
            logger.info(
                f"[DRY RUN] Would update {article.file_path} with Spanish slug: {spanish_slug}"
            )
            return

        # Load article
        with open(article.file_path, "r", encoding="utf-8") as f:
            post = frontmatter.load(f)

        # Add Spanish reference
        if "alternateLocales" not in post.metadata:
            post.metadata["alternateLocales"] = {}
        post.metadata["alternateLocales"]["es"] = spanish_slug

        # Save
        with open(article.file_path, "w", encoding="utf-8") as f:
            f.write(frontmatter.dumps(post))

        logger.info(f"Updated English article with Spanish reference: {article.slug}")


class TranslationOrchestrator:
    """Orchestrates the translation process."""

    def __init__(
        self,
        project_root: Path,
        deepl_api_key: str,
        dry_run: bool = False,
        force: bool = False,
    ):
        self.project_root = project_root
        self.dry_run = dry_run
        self.force = force

        # Load configuration
        self.config = self._load_config()

        # Initialize DeepL client
        self.deepl_client = deepl.Translator(deepl_api_key)

        # Initialize components
        self.article_manager = ArticleManager(project_root)
        self.translator = ArticleTranslator(self.config, self.deepl_client, dry_run)

        # Statistics
        self.stats = {
            "total": 0,
            "translated": 0,
            "skipped": 0,
            "failed": 0,
        }

    def _load_config(self) -> TranslationConfig:
        """Load translation configuration from translation-config.json and article-categories.json."""
        config_path = self.project_root / "translation-config.json"
        categories_path = self.project_root / "src" / "content" / "article-categories.json"

        # Load translation config
        if not config_path.exists():
            logger.warning("translation-config.json not found, using defaults")
            config_data = {}
        else:
            with open(config_path, "r", encoding="utf-8") as f:
                config_data = json.load(f)

        # Categories are now locale-independent keys, so no translation mapping needed
        logger.info("Categories use keys (no translation needed)")

        return TranslationConfig(
            non_translatable_terms=config_data.get("nonTranslatableTerms", []),
            formality=config_data.get("translationSettings", {}).get(
                "formality", "default"
            ),
            preserve_formatting=config_data.get("translationSettings", {}).get(
                "preserveFormatting", True
            ),
            target_language=config_data.get("translationSettings", {}).get(
                "targetLanguage", "es"
            ),
        )

    def translate_article(self, article: ArticleMetadata) -> bool:
        """
        Translate a single article.

        Args:
            article: Article to translate

        Returns:
            True if successful, False otherwise
        """
        try:
            # Translate
            translated_fm, translated_content, spanish_slug = (
                self.translator.translate_article(article)
            )

            # Save Spanish article
            self.article_manager.save_spanish_article(
                spanish_slug, translated_fm, translated_content, self.dry_run
            )

            # Update English article reference
            self.article_manager.update_english_article_reference(
                article, spanish_slug, self.dry_run
            )

            self.stats["translated"] += 1
            return True

        except Exception as e:
            logger.error(f"Failed to translate {article.slug}: {e}")
            self.stats["failed"] += 1
            return False

    def translate_all(self, specific_article: Optional[str] = None):
        """
        Translate all untranslated articles or a specific article.

        Args:
            specific_article: Optional slug of specific article to translate
        """
        # Get articles to translate
        if specific_article:
            article_path = self.article_manager.en_dir / f"{specific_article}.mdx"
            if not article_path.exists():
                console.print(
                    f"[bold red]Error:[/bold red] Article not found: {specific_article}"
                )
                return

            article = self.article_manager.load_article(article_path)
            articles = [article]

            if article.has_translation and not self.force:
                console.print(
                    f"[yellow]Warning:[/yellow] Article already translated: {specific_article}"
                )
                console.print("Use --force to re-translate")
                return
        else:
            if self.force:
                articles = self.article_manager.get_all_english_articles()
            else:
                articles = self.article_manager.get_untranslated_articles()

        self.stats["total"] = len(articles)

        if not articles:
            console.print("[green]✓[/green] All articles are already translated!")
            return

        # Display summary
        console.print(f"\n[bold]Translation Summary[/bold]")
        console.print(f"Articles to translate: {len(articles)}")
        console.print(f"Mode: {'DRY RUN' if self.dry_run else 'LIVE'}\n")

        # Translate with progress bar
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console,
        ) as progress:
            task = progress.add_task(
                f"Translating articles...", total=len(articles)
            )

            for article in articles:
                progress.update(
                    task, description=f"Translating: {article.slug}"
                )
                self.translate_article(article)
                progress.advance(task)

        # Display results
        self._display_results()

    def _display_results(self):
        """Display translation results in a table."""
        console.print("\n[bold]Translation Results[/bold]\n")

        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Metric", style="cyan")
        table.add_column("Count", justify="right", style="green")

        table.add_row("Total Articles", str(self.stats["total"]))
        table.add_row("Translated", str(self.stats["translated"]))
        table.add_row("Skipped", str(self.stats["skipped"]))
        table.add_row("Failed", str(self.stats["failed"]))

        console.print(table)

        if self.stats["failed"] > 0:
            console.print(
                f"\n[yellow]⚠[/yellow]  {self.stats['failed']} article(s) failed to translate"
            )
        else:
            console.print(
                f"\n[green]✓[/green] Translation complete!"
            )


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Translate portfolio articles from English to Spanish",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Simulate translation without writing files",
    )

    parser.add_argument(
        "--article",
        type=str,
        metavar="SLUG",
        help="Translate specific article by slug",
    )

    parser.add_argument(
        "--force",
        action="store_true",
        help="Force re-translation of existing articles",
    )

    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable verbose logging",
    )

    args = parser.parse_args()

    # Configure logging
    if args.verbose:
        logger.setLevel(logging.DEBUG)

    # Load environment variables
    load_dotenv()

    # Get DeepL API key
    deepl_api_key = os.getenv("DEEPL_API_KEY")
    if not deepl_api_key:
        console.print(
            "[bold red]Error:[/bold red] DEEPL_API_KEY not found in environment"
        )
        console.print("Please set DEEPL_API_KEY in your .env file")
        sys.exit(1)

    # Get project root
    project_root = Path(__file__).parent.parent.absolute()

    # Display banner
    console.print("\n[bold cyan]Article Translation Tool[/bold cyan]")
    console.print("[dim]Translating English articles to Spanish using DeepL AI[/dim]\n")

    try:
        # Create orchestrator
        orchestrator = TranslationOrchestrator(
            project_root=project_root,
            deepl_api_key=deepl_api_key,
            dry_run=args.dry_run,
            force=args.force,
        )

        # Run translation
        orchestrator.translate_all(specific_article=args.article)

    except KeyboardInterrupt:
        console.print("\n[yellow]Translation cancelled by user[/yellow]")
        sys.exit(1)
    except Exception as e:
        logger.exception("Translation failed")
        sys.exit(1)


if __name__ == "__main__":
    main()