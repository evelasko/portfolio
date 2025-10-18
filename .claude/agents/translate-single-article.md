# Single Article Translation Agent

This agent translates ONE specific article from English to Spanish using the automated translation script.

## Objective

Translate a single article specified by its English slug from `src/content/articles/en/` to `src/content/articles/es/`.

## Input Required

- **English slug**: The filename (without .mdx extension) of the article to translate

## Workflow

### 1. Verify Article Exists

```bash
ls src/content/articles/en/{english-slug}.mdx
```

If the file doesn't exist, report error and stop.

### 2. Run Translation Script

Use the Python translation script which handles everything automatically:

```bash
python3 scripts/translate_articles.py --article {english-slug} --verbose
```

**What the script does:**

- ✅ Loads configuration from `translation-config.json`
- ✅ Loads categories from `src/content/article-categories.json`
- ✅ Reads source article and parses frontmatter
- ✅ Translates title, description via DeepL API
- ✅ Translates category via **lookup table** (instant, free, consistent)
- ✅ Translates tags via DeepL API
- ✅ Translates content while preserving code blocks, MDX components, URLs
- ✅ Generates intelligent Spanish slug
- ✅ Writes Spanish article to `src/content/articles/es/`
- ✅ Updates English article with cross-reference
- ✅ Validates all operations

**Categories are handled specially:**

- Categories are translated via lookup table from `article-categories.json`
- No DeepL API calls for categories (instant, free, always consistent)
- Falls back to DeepL only if category not in lookup table

### 3. Verify Success

Check the output for:

- ✅ "Translation complete" message
- ✅ Spanish slug generated
- ✅ Files written successfully
- ❌ Any errors or warnings

### 4. Report Results

Return a structured report:

```text
✅ Translation Complete

English Article: {english-slug}
Spanish Article: {spanish-slug}

Files Created/Updated:
- src/content/articles/es/{spanish-slug}.mdx (created)
- src/content/articles/en/{english-slug}.mdx (updated with cross-reference)

Category Translation: {english-category} → {spanish-category} (via lookup table)
```

## Alternative: Dry Run First

To preview without making changes:

```bash
python3 scripts/translate_articles.py --article {english-slug} --dry-run
```

This shows what would be done without writing files.

## Tools Used

- **Bash** - Run Python translation script
- **Read** (optional) - Verify article exists or check results

## Example Invocation

```typescript
Task(
  description: "Translate article: creative-tech-tools-2024",
  subagent_type: "general-purpose",
  prompt: `Translate the article "creative-tech-tools-2024" from English to Spanish.

  Follow the workflow in .claude/agents/translate-single-article.md.

  Use the Python translation script:
  python3 scripts/translate_articles.py --article creative-tech-tools-2024 --verbose

  Report the Spanish slug generated and confirm files were created.`
)
```

## Success Criteria

- ✅ Translation script runs without errors
- ✅ Spanish MDX file created with valid frontmatter
- ✅ Category translated via lookup table (not DeepL)
- ✅ Content properly translated with code/URLs preserved
- ✅ English article updated with cross-reference
- ✅ Spanish slug follows naming conventions

## Error Handling

If translation fails:

1. Check the error message from the script
2. Common issues:
   - Missing DeepL API key → Set `DEEPL_API_KEY` in `.env`
   - Article not found → Verify slug is correct
   - Already translated → Use `--force` flag to re-translate
   - Category not in lookup → Will use DeepL (warning logged)

## Notes

- **One article at a time**: This agent translates exactly ONE article
- **Idempotent**: Can re-run safely (use `--force` to overwrite)
- **Efficient**: Categories use lookup table (no API calls)
- **Validated**: Script validates frontmatter and cross-references
