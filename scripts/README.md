# Article Translation Script

Professional-grade Python script for translating portfolio articles from English to Spanish using the DeepL API.

## Features

- ✅ **DeepL API Integration** - Professional quality AI translation
- ✅ **Smart Content Protection** - Preserves code blocks, MDX components, URLs, and technical terms
- ✅ **Intelligent Slug Generation** - Creates SEO-friendly Spanish slugs
- ✅ **Frontmatter Handling** - Translates metadata while preserving dates and authors
- ✅ **Cross-Reference Management** - Maintains bidirectional locale links
- ✅ **Batch Processing** - Translate all articles or specific ones
- ✅ **Dry Run Mode** - Preview translations without writing files
- ✅ **Error Recovery** - Robust error handling and logging
- ✅ **Progress Tracking** - Beautiful terminal UI with progress indicators
- ✅ **Configuration** - Respects `translation-config.json` settings

## Installation

### 1. Install Python Dependencies

```bash
pip install -r scripts/requirements.txt
```

Or if you prefer using a virtual environment (recommended):

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r scripts/requirements.txt
```

### 2. Configure DeepL API Key

Get your API key from [DeepL Pro API](https://www.deepl.com/pro-api).

Add it to your `.env` file:

```bash
# Copy example file
cp .env.example .env

# Edit .env and add your key
DEEPL_API_KEY=your_actual_api_key_here
```

## Usage

### Translate All Untranslated Articles

```bash
python scripts/translate_articles.py
```

This will:

1. Scan `src/content/articles/en/` for articles
2. Check which ones lack Spanish translations
3. Translate each one using DeepL
4. Save to `src/content/articles/es/`
5. Update English articles with cross-references

### Translate Specific Article

```bash
python scripts/translate_articles.py --article creative-tech-tools-2024
```

### Dry Run (Preview Without Writing)

```bash
python scripts/translate_articles.py --dry-run
```

Perfect for testing before committing to translations.

### Force Re-translate Existing Articles

```bash
python scripts/translate_articles.py --force
```

Re-translates all articles, including those already translated.

### Verbose Logging

```bash
python scripts/translate_articles.py --verbose
```

Shows detailed debug information during translation.

## How It Works

### Translation Process

1. **Discovery** - Scans English articles and identifies untranslated ones
2. **Protection** - Identifies content that shouldn't be translated:
   - Code blocks (` ```...``` `)
   - Inline code (`` `...` ``)
   - MDX components (`<Component>...</Component>`)
   - URLs (`https://...`)
   - Technical terms (from `translation-config.json`)
3. **Translation** - Sends text to DeepL API with appropriate settings
4. **Restoration** - Restores protected content to translated text
5. **Slug Generation** - Creates intelligent Spanish slug
6. **File Writing** - Saves Spanish MDX file
7. **Cross-Referencing** - Updates both English and Spanish files with locale links

### Content Protection

The script uses advanced regex patterns and placeholder replacement to protect:

**Code blocks:**

```python
def hello():
    print("This won't be translated")
```

**MDX components:**

```jsx
<Callout type="info">This component structure is preserved</Callout>
```

**Technical terms:**
Based on `translation-config.json`:

```json
{
  "nonTranslatableTerms": [
    "React", "Next.js", "TypeScript", "Python", ...
  ]
}
```

### Slug Generation

English slugs are intelligently translated to Spanish:

| English Slug                  | Spanish Slug                            |
| ----------------------------- | --------------------------------------- |
| `ai-as-co-choreographer`      | `ia-como-co-coreografa`                 |
| `from-stage-to-screen`        | `del-escenario-a-la-pantalla`           |
| `building-creative-community` | `construyendo-comunidad-creativa`       |
| `creative-tech-tools-2024`    | `herramientas-tecnologia-creativa-2024` |

The script uses:

1. **Common translation dictionary** for frequent words
2. **Title-based generation** for descriptive slugs
3. **Intelligent selection** between both methods

### Frontmatter Translation

**English frontmatter:**

```yaml
---
title: "AI as Co-Choreographer: When Technology Learns to Dance"
description: "Exploring how artificial intelligence transforms..."
category: "Art + Technology"
tags: ["AI", "Dance", "Creative Technology"]
publishedAt: "2024-03-15"
author: "Enrique Velasco"
featured: false
draft: false
alternateLocales:
  es: "ia-como-co-coreografa"
---
```

**Spanish frontmatter:**

```yaml
---
title: "IA como co-coreógrafa: Cuando la tecnología aprende a bailar"
description: "Explorando cómo la inteligencia artificial transforma..."
category: "Arte + Tecnología"
tags: ["AI", "Danza", "Tecnología creativa"]
publishedAt: "2024-03-15" # Preserved
author: "Enrique Velasco" # Preserved
featured: false # Preserved
draft: false # Preserved
alternateLocales:
  en: "ai-as-co-choreographer" # Cross-reference added
---
```

## Configuration

### Translation Settings

Edit `translation-config.json` in the project root:

```json
{
  "nonTranslatableTerms": [
    "CENIE",
    "OpenPose",
    "MediaPipe",
    "TouchDesigner",
    "Python",
    "React",
    "Next.js"
  ],
  "translationSettings": {
    "formality": "default",
    "preserveFormatting": true,
    "targetLanguage": "es"
  }
}
```

**Formality options:**

- `"less"` - Informal (tú)
- `"default"` - Balanced (recommended for creative content)
- `"more"` - Formal (usted)

### Adding Non-Translatable Terms

Add any technical terms, product names, or proper nouns that should never be translated:

```json
{
  "nonTranslatableTerms": ["YourProductName", "SpecificAPI", "TechnicalTerm"]
}
```

## Output

The script provides beautiful terminal output with:

- **Progress indicators** - Real-time translation progress
- **Colored logging** - Easy-to-read status messages
- **Summary table** - Final statistics

Example output:

```text
Article Translation Tool
Translating English articles to Spanish using DeepL AI

Translation Summary
Articles to translate: 16
Mode: LIVE

⠋ Translating: creative-tech-tools-2024

Translation Results
┏━━━━━━━━━━━━━━━━━┳━━━━━━━┓
┃ Metric          ┃ Count ┃
┡━━━━━━━━━━━━━━━━━╇━━━━━━━┩
│ Total Articles  │    16 │
│ Translated      │    16 │
│ Skipped         │     0 │
│ Failed          │     0 │
└─────────────────┴───────┘

✓ Translation complete!
```

## Architecture

### Class Structure

```tree
TranslationOrchestrator
├── ArticleManager
│   ├── load_article()
│   ├── get_untranslated_articles()
│   └── save_spanish_article()
│
├── ArticleTranslator
│   ├── translate_text()
│   ├── translate_frontmatter()
│   ├── translate_article()
│   └── SlugGenerator
│       ├── generate_from_english()
│       └── generate_from_title()
│
└── TranslationConfig
    ├── non_translatable_terms
    ├── formality
    └── target_language
```

### Key Components

**ArticleManager** - File system operations

- Loads MDX articles with frontmatter
- Identifies untranslated articles
- Saves translated files
- Updates cross-references

**ArticleTranslator** - Translation logic

- Protects code and special content
- Calls DeepL API
- Restores protected content
- Generates Spanish slugs

**SlugGenerator** - Intelligent slug creation

- Common word translations
- Title-based generation
- Normalization and cleanup

**TranslationOrchestrator** - Coordination

- Loads configuration
- Manages DeepL client
- Orchestrates batch processing
- Tracks statistics

## Error Handling

The script includes comprehensive error handling:

- **Missing API key** - Clear error message with instructions
- **DeepL API failures** - Logs error and continues with next article
- **File I/O errors** - Catches and reports file operation failures
- **Invalid frontmatter** - Gracefully handles malformed metadata
- **Network issues** - Retries with exponential backoff (via DeepL client)

## Best Practices

### Before Running

1. **Backup your work** - Commit current changes to git
2. **Test with dry-run** - Preview changes before applying
3. **Start with one article** - Use `--article` flag to test
4. **Review configuration** - Ensure `translation-config.json` is up to date

### After Running

1. **Review translations** - AI is good but not perfect
2. **Check cross-references** - Verify `alternateLocales` links
3. **Test build** - Run `pnpm build` to validate MDX
4. **Commit separately** - Easier to review in git

### Cost Management

DeepL API charges based on character count:

- **Free tier**: 500,000 characters/month
- **Pro tier**: Pay-as-you-go

**Average article**: ~3,000-5,000 characters

Monitor your usage:

```bash
# Check DeepL usage
curl -X POST https://api.deepl.com/v2/usage \
  -H "Authorization: DeepL-Auth-Key YOUR_KEY"
```

## Troubleshooting

### API Key Not Found

```text
Error: DEEPL_API_KEY not found in environment
```

**Solution**: Add your API key to `.env` file

### Translation Failed

```text
Failed to translate creative-tech-tools-2024: Invalid API key
```

**Solution**: Verify your DeepL API key is valid and active

### Already Translated

```text
Warning: Article already translated: hello-world
```

**Solution**: Use `--force` flag to re-translate

### Module Not Found

```text
ModuleNotFoundError: No module named 'deepl'
```

**Solution**: Install dependencies: `pip install -r scripts/requirements.txt`

## Extending the Script

### Add New Target Language

1. Update `translation-config.json`:

   ```json
   {
     "translationSettings": {
       "targetLanguage": "fr" // French
     }
   }
   ```

2. Create target directory:

```bash
mkdir -p src/content/articles/fr
```

### Custom Slug Mapping

Edit `SlugGenerator.COMMON_TRANSLATIONS`:

```python
COMMON_TRANSLATIONS = {
    "your-term": "tu-termino",
    ...
}
```

### Add Translation Memory

Implement caching to avoid re-translating identical content:

```python
class TranslationCache:
    def __init__(self, cache_file: Path):
        self.cache = self._load_cache(cache_file)

    def get(self, text: str) -> Optional[str]:
        return self.cache.get(hash(text))

    def set(self, text: str, translation: str):
        self.cache[hash(text)] = translation
```

## Performance

**Translation speed:**

- ~5-10 seconds per article (depending on length)
- ~2-3 minutes for 16 articles
- Network latency is the main bottleneck

**Optimization tips:**

- Use batch translation for large volumes
- Cache common translations
- Run during off-peak hours for faster API response

## Security

- **API key protection** - Never commit `.env` to git
- **Rate limiting** - DeepL client handles automatic rate limiting
- **Input validation** - Sanitizes file paths and slugs
- **Error messages** - Don't expose sensitive information

## Contributing

To improve the translation script:

1. Test changes with `--dry-run` first
2. Update this README with new features
3. Add tests for new functionality
4. Follow PEP 8 style guidelines

## License

Part of the Enrique Velasco Portfolio project.

## Support

For issues:

- Check this README first
- Review error messages carefully
- Check DeepL API status: <https://status.deepl.com>
- Review project documentation in [CLAUDE.md](../CLAUDE.md)

---

**Happy translating! 🌍✨**
