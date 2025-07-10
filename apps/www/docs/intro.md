---
sidebar_position: 1
title: Introduction
---

# @k5e/cn

**@k5e/cn** is a [shadcn/ui](https://ui.shadcn.com)-inspired component library specifically designed for kintone customization. It provides copy-paste components that developers can easily integrate into their kintone applications.

## Why @k5e/cn?

### The Problem

kintone customization often involves:
- Writing repetitive UI code
- Managing complex state logic
- Ensuring consistent styling across apps
- Dealing with kintone's specific APIs and events

### Our Solution

@k5e/cn provides:
- **Ready-to-use components** - Tested and optimized for kintone
- **Copy & Paste approach** - Full control over your code
- **Official styling** - Uses kintone's CSS classes
- **TypeScript support** - Type-safe development
- **Zero dependencies** - Self-contained components

## Philosophy

Following the shadcn/ui approach:

1. **Not a library** - Components are copied into your project
2. **Full ownership** - You control and customize the code
3. **No black box** - All code is transparent and modifiable
4. **Pick what you need** - Only add components you actually use

> **Note**: Unlike shadcn/ui which configures existing React projects, @k5e/cn's `init` command creates new projects from scratch - perfect for starting fresh kintone customizations.

## Core Principles

### Code That Fits in Your Head

We follow the principles from "Code That Fits in Your Head":
- Manage complexity by keeping code comprehensible
- Use minimal vertical slices for development
- Practice continuous refactoring
- Design APIs with clear affordances

### kintone-First Design

- All components follow [kintone's official style guide](https://cybozu.dev/ja/kintone/sdk/library/plugin-stylesheet-guide/)
- Wrapped in IIFE to prevent global pollution
- Optimized for kintone's event system
- Desktop-first (mobile support planned)

## Getting Started

```bash
# Initialize a new project
pnpm dlx k5e-cn@latest init

# Add your first component
pnpm dlx k5e-cn@latest add table-filter
```

That's it! You now have a fully functional table filter in your kintone app.

## Available Components

- **table-filter** - Advanced filtering for record lists
- **form-validator** - Form validation with custom rules
- **conditional-fields** - Show/hide fields based on conditions
- **bulk-update** - Bulk record updates UI
- **export-enhanced** - Enhanced CSV/Excel export

## Next Steps

- [Installation Guide](/docs/getting-started/installation)
- [Quick Start Tutorial](/docs/getting-started/quick-start)
- [Component Documentation](/docs/components/table-filter)