# Article Translation Orchestrator Agent

This agent orchestrates bulk translation of articles using the Python translation script.

## Objective

Identify all untranslated articles and translate them from English to Spanish in an efficient, automated manner.

## Workflow

### 1. Discovery Phase

Use the Python discovery script to get translation status:

```bash
python3 scripts/get_translation_status.py --format json
```

This returns structured JSON with:

- `missing_slugs[]` - List of articles needing translation
- `missing_count` - Total count
- `translated[]` - Already translated articles
- `issues[]` - Any validation issues

**Advantages over bash:**

- ✅ Faster - single command vs multiple
- ✅ Structured data - JSON vs text parsing
- ✅ Validation - checks cross-references
- ✅ Reliable - no token-heavy comparisons

### 2. Translation Strategy

**Option A: Batch Translation (Recommended)**

Translate all missing articles in one command:

```bash
python3 scripts/translate_articles.py --verbose
```

This translates ALL untranslated articles automatically:

- Progress bar shows real-time status
- Categories translated via lookup table (free, instant)
- Comprehensive error handling
- Summary report at end

**Option B: Individual Translation**

For specific articles or when you need more control, translate one at a time:

```bash
for slug in {missing-slug-1} {missing-slug-2} {missing-slug-3}
do
  python3 scripts/translate_articles.py --article "$slug" --verbose
done
```

### 3. Monitor Progress

The script outputs:

- Current article being translated
- Progress indicator
- Category translation method (lookup vs DeepL)
- Success/failure for each article

### 4. Final Report

The script automatically provides a summary:

```text
Translation Results
┏━━━━━━━━━━━━━━━━━┳━━━━━━━┓
┃ Metric          ┃ Count ┃
┣━━━━━━━━━━━━━━━━━╋━━━━━━━┫
│ Total Articles  │    16 │
│ Translated      │    16 │
│ Skipped         │     0 │
│ Failed          │     0 │
┗━━━━━━━━━━━━━━━━━┻━━━━━━━┛

✓ Translation complete!
```

If there are failures, they'll be listed with error details.

### 5. Validation (Optional)

After translation, validate the results:

```bash
python3 scripts/get_translation_status.py --validate --format table
```

This checks:

- Bidirectional cross-references
- Date consistency
- Orphaned translations

## Key Features

**Automated & Efficient:**

- ✅ Discovery script replaces bash commands (faster, structured)
- ✅ Categories use lookup table (no API calls, instant, consistent)
- ✅ Batch processing available
- ✅ Built-in validation
- ✅ Comprehensive error handling

**Smart Category Handling:**

- Categories translated via lookup from `article-categories.json`
- Zero DeepL API calls for categories
- Always consistent translations
- Falls back to DeepL only if category not in lookup

**Progress Tracking:**

- Real-time progress bar
- Per-article status
- Summary statistics
- Error isolation

## Agent Invocation

### For Bulk Translation

```typescript
Task(
  description: "Translate all missing articles",
  subagent_type: "general-purpose",
  prompt: `Translate all missing articles from English to Spanish.

  Follow .claude/agents/article-translator.md:

  1. Run discovery: python3 scripts/get_translation_status.py --format json
  2. Run translation: python3 scripts/translate_articles.py --verbose
  3. Validate: python3 scripts/get_translation_status.py --validate --format table

  Report the summary results.`
)
```

### For Single Article

```typescript
Task(
  description: "Translate article: {slug}",
  subagent_type: "general-purpose",
  prompt: `Translate "{slug}" from English to Spanish.

  Follow .claude/agents/translate-single-article.md.

  Run: python3 scripts/translate_articles.py --article {slug} --verbose

  Report the Spanish slug generated.`
)
```

## Error Handling

Common issues and solutions:

| Error                     | Cause              | Solution                        |
| ------------------------- | ------------------ | ------------------------------- |
| `DEEPL_API_KEY not found` | Missing API key    | Set in `.env` file              |
| `Article not found`       | Wrong slug         | Check spelling                  |
| `Already translated`      | Translation exists | Use `--force` flag              |
| `Category not in lookup`  | New category       | Will use DeepL (warning logged) |

## Success Criteria

- ✅ All missing articles translated
- ✅ Categories used lookup table (check logs)
- ✅ No validation issues
- ✅ Cross-references updated
- ✅ Summary shows 0 failures

## Notes

- **Idempotent**: Safe to re-run (skips already translated)
- **Force mode**: Use `--force` to re-translate existing articles
- **Dry run**: Use `--dry-run` to preview without making changes
- **Efficient**: Discovery script is faster than bash commands
