# @k5e/www

Documentation site for @k5e/cn built with Docusaurus.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Serve production build locally
pnpm serve
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

Manual deployment:

```bash
# Deploy to GitHub Pages
pnpm deploy
```

## Structure

```
apps/www/
├── docs/                 # Documentation content
│   ├── intro.md         # Introduction page
│   ├── components/      # Component documentation
│   ├── getting-started/ # Getting started guides
│   └── guides/          # Advanced guides
├── src/
│   ├── components/      # React components
│   ├── css/            # Global styles
│   └── pages/          # Custom pages
├── static/             # Static assets
├── docusaurus.config.js # Main configuration
└── sidebars.js         # Sidebar configuration
```

## Writing Documentation

- Documentation is written in MDX (Markdown + JSX)
- Place component docs in `docs/components/`
- Use frontmatter for metadata
- Include live examples where possible

Example:

```mdx
---
title: Component Name
description: Brief description
---

# Component Name

Description and usage...

## Installation

\`\`\`bash
pnpm dlx k5e-cn@latest add component-name
\`\`\`

## Examples

<ComponentPreview component="component-name" />
```