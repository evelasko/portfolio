# Prettier Configuration

This project is configured with Prettier for consistent code formatting across the entire codebase.

## Configuration Files

- `.prettierrc` - Main Prettier configuration
- `.prettierignore` - Files and directories to exclude from formatting
- `.vscode/settings.json` - VS Code settings for automatic formatting

## Available Scripts

```bash
# Format all files
npm run format

# Check if files are formatted correctly (useful for CI)
npm run format:check

# Format only staged files (useful for pre-commit hooks)
npm run format:staged

# Run ESLint with auto-fix
npm run lint:fix
```

## Configuration Details

The Prettier configuration uses the following settings:

- **Semicolons**: Always use semicolons
- **Trailing Commas**: ES5 compatible (objects and arrays)
- **Quotes**: Double quotes for strings, single quotes for JSX
- **Print Width**: 80 characters
- **Tab Width**: 2 spaces
- **Bracket Spacing**: Spaces inside object brackets
- **Arrow Parens**: Avoid parentheses when possible
- **End of Line**: LF (Unix style)

## VS Code Integration

If you're using VS Code, the project includes settings that will:

- Format files automatically on save
- Use Prettier as the default formatter for all supported file types
- Run ESLint auto-fix on save

Make sure you have the "Prettier - Code formatter" extension installed.

## Pre-commit Hooks (Optional)

To automatically format files before committing, you can install `husky` and `lint-staged`:

```bash
npm install --save-dev husky lint-staged
npx husky init
```

Then add to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write", "eslint --fix"]
  }
}
```

## Formatting the Entire Codebase

To format all files in the project:

```bash
npm run format
```

This will format all supported files according to the Prettier configuration.

## Checking Formatting

To check if files are properly formatted without making changes:

```bash
npm run format:check
```

This is useful for CI/CD pipelines to ensure code is properly formatted before merging.
