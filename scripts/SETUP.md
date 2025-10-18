# Quick Setup Guide

## Installation

### Option 1: Virtual Environment (Recommended)

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r scripts/requirements.txt
```

### Option 2: Global Install

```bash
pip install -r scripts/requirements.txt
```

## Configure DeepL API Key

1. Get your API key from [DeepL Pro API](https://www.deepl.com/pro-api)

2. Create `.env` file:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your key:

```env
DEEPL_API_KEY=your_actual_key_here
```

## Test Installation

```bash
python3 scripts/translate_articles.py --help
```

You should see the help message if everything is installed correctly.

## First Translation (Dry Run)

```bash
python3 scripts/translate_articles.py --dry-run
```

This will show you what would be translated without making any changes.

## Translate Everything

```bash
python3 scripts/translate_articles.py
```

## Deactivate Virtual Environment

When you're done:

```bash
deactivate
```

---

For full documentation, see [scripts/README.md](README.md)
