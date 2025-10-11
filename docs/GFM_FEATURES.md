# GitHub Flavored Markdown (GFM) Features

This portfolio supports all GitHub Flavored Markdown features via the `remark-gfm` plugin.

## Supported Features

### 1. Tables

Create beautiful, styled tables using markdown syntax:

```markdown
| Column 1 | Column 2 | Column 3  |
| -------- | -------- | --------- |
| Row 1    | Data     | More data |
| Row 2    | Data     | More data |
```

**Rendered as:**

![Table with borders, hover effects, and proper spacing]

**Table Alignment:**

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| Text |  Text  |  Text |
```

- `:---` = Left aligned (default)
- `:---:` = Center aligned
- `---:` = Right aligned

**Styling Features:**

- ✅ Bordered table with rounded corners
- ✅ Header row with background color
- ✅ Row dividers for readability
- ✅ Hover effect on rows
- ✅ Responsive overflow scrolling
- ✅ Typography constants for consistency

### 2. Strikethrough

Use double tildes to strike through text:

```markdown
~~This text is crossed out~~
```

**Example:**
The old price was ~~$99.99~~ but now it's only **$49.99**!

### 3. Task Lists

Create interactive checklists:

```markdown
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task
```

**Rendered as:**

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

**Use cases:**

- Project roadmaps
- Feature checklists
- Todo lists
- Progress tracking

### 4. Autolink Literals

URLs and email addresses become clickable automatically:

```markdown
Visit https://nextjs.org for more info.
Contact us at hello@example.com
```

**Types of autolinks:**

- HTTP/HTTPS URLs: `https://example.com`
- WWW URLs: `www.example.com`
- Email addresses: `user@domain.com`

## Advanced Table Examples

### Complex Data Tables

```markdown
| Framework | Version | Performance | Bundle Size | Rating     |
| --------- | ------- | ----------- | ----------- | ---------- |
| Next.js   | 15.5.4  | 95/100      | 85 KB       | ⭐⭐⭐⭐⭐ |
| React     | 19.0.0  | 90/100      | 45 KB       | ⭐⭐⭐⭐⭐ |
| Vue       | 3.4.0   | 92/100      | 40 KB       | ⭐⭐⭐⭐   |
```

### Tables with Markdown

You can use markdown inside table cells:

```markdown
| Feature | Code         | Description         |
| ------- | ------------ | ------------------- |
| Bold    | `**text**`   | Makes text **bold** |
| Italic  | `*text*`     | Makes text _italic_ |
| Code    | `` `code` `` | Inline `code`       |
```

### Tables with Task Lists

```markdown
| Quarter | Tasks                        | Status |
| ------- | ---------------------------- | ------ |
| Q1      | - [x] Task 1<br>- [x] Task 2 | 100%   |
| Q2      | - [ ] Task 3<br>- [ ] Task 4 | 0%     |
```

### Tables with Links

```markdown
| Library | Documentation      | Version |
| ------- | ------------------ | ------- |
| Next.js | https://nextjs.org | 15.5.4  |
| React   | https://react.dev  | 19.0.0  |
```

## Combining GFM Features

You can combine multiple GFM features in your content:

```markdown
## Project Status

| Feature     | Status        | Notes                   |
| ----------- | ------------- | ----------------------- |
| ~~Old API~~ | ❌ Deprecated | Use v2 instead          |
| Current API | ✅ Stable     | https://api.example.com |
| New Feature | 🚧 Beta       | Testing required        |

### Todo List

- [x] ~~Complete setup~~ Done!
- [ ] Add tests
- [ ] Deploy to production
```

## Table Styling Details

The table component includes these styles:

### Container

- Rounded corners with border
- Overflow scrolling for wide tables
- Margin spacing above and below

### Header (`thead`)

- Background color for distinction
- Bottom border separator
- Bold, semibold font weight

### Body (`tbody`)

- Row dividers for readability
- Hover effect for better UX

### Cells

- Generous padding (6px horizontal, 3-4px vertical)
- Typography constants for consistent sizing
- Proper text color (white-100 for headers, white-96 for cells)

## Custom Table Component

The table rendering uses custom React components:

```tsx
// From src/components/mdx/MDXComponents.tsx
table: ({ children, ...props }) => (
  <div className="my-8 overflow-x-auto rounded-lg border border-black-30">
    <table className={clsx(TYPOGRAPHY.text16, "w-full border-collapse")} {...props}>
      {children}
    </table>
  </div>
),
thead: ({ children, ...props }) => (
  <thead className="bg-black-10" {...props}>
    {children}
  </thead>
),
// ... additional components
```

## Best Practices

### Tables

1. **Keep tables focused** - Don't make them too wide
2. **Use alignment** - Right-align numbers, center icons
3. **Break long content** - Use `<br>` for multi-line cells
4. **Add context** - Include a caption or intro paragraph
5. **Test responsiveness** - Tables scroll on mobile

### Task Lists

1. **Be specific** - Clear, actionable items
2. **Group related tasks** - Use subheadings
3. **Update regularly** - Keep status current
4. **Combine with dates** - Add temporal context

### Strikethrough

1. **Show changes** - Indicate deprecated features
2. **Track progress** - Mark completed items
3. **Don't overuse** - Too much is distracting

## Troubleshooting

### Tables Not Rendering

**Problem:** Tables appear as plain text
**Solution:** Ensure `remark-gfm` is installed and configured:

```bash
pnpm add remark-gfm
```

```tsx
// In src/lib/mdx/render.tsx
import remarkGfm from "remark-gfm";

const { content } = await compileMDX({
  source,
  options: {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  },
});
```

### Table Alignment Not Working

**Problem:** Alignment syntax not recognized
**Solution:** Make sure you have the colons in the right place:

```markdown
| Left | Center | Right |
|:-----|:------:|------:| ← Colons control alignment
```

### Task Lists Not Interactive

**Note:** Task lists in MDX are rendered as styled checkboxes but are not interactive (they don't toggle). They're meant for displaying status, not actual user interaction.

## Examples

See the live examples:

- English: `/articles/gfm-features-demo`
- Spanish: `/es/articles/demo-caracteristicas-gfm`

## Additional Resources

- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [remark-gfm Documentation](https://github.com/remarkjs/remark-gfm)
- [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables)

---

**All GFM features are fully functional and styled consistently with your design system!**
