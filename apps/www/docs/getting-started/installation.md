---
title: Installation
description: How to install and set up @k5e/cn in your project
---

# Installation

This guide will help you set up @k5e/cn in your kintone project.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18.0 or higher
- pnpm, npm, or yarn package manager
- A kintone app where you want to use the components

## Quick Start

The fastest way to get started is using our CLI:

```bash
pnpm dlx k5e-cn@latest init
```

This command will:
1. Create a new project structure
2. Set up build configuration
3. Install necessary dependencies
4. Create a basic entry file

## Manual Installation

If you prefer to add @k5e/cn to an existing project:

### 1. Project Setup

First, ensure your project has a proper build setup. We recommend using Vite:

```bash
pnpm add -D vite @biomejs/biome
```

### 2. Configure Vite

Create a `vite.config.js` file:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'my-kintone-app',
      formats: ['iife'],
      fileName: () => 'bundle.js',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
})
```

### 3. Add Components

Use the CLI to add components:

```bash
# Add a single component
pnpm dlx k5e-cn@latest add table-filter

# Add multiple components
pnpm dlx k5e-cn@latest add table-filter form-validator

# Add all available components
pnpm dlx k5e-cn@latest add --all
```

### 4. Import Components

In your main JavaScript/TypeScript file:

```javascript
// src/index.js
import './components/table-filter.js'
import './components/form-validator.js'

// Your custom code here
```

## TypeScript Setup

If you're using TypeScript, add these type definitions:

```bash
pnpm add -D typescript @types/kintone-js-sdk
```

Create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Build and Deploy

### Building Your Project

```bash
# Development build with watch mode
pnpm dev

# Production build
pnpm build
```

The build output will be in `dist/bundle.js`.

### Deploying to kintone

1. Open your kintone app settings
2. Navigate to "JavaScript and CSS Customization"
3. Upload `dist/bundle.js`
4. Save the settings

## Package Managers

@k5e/cn works with all major package managers:

### pnpm (Recommended)

```bash
pnpm dlx k5e-cn@latest init
pnpm dlx k5e-cn@latest add table-filter
```

### npm

```bash
npx k5e-cn@latest init
npx k5e-cn@latest add table-filter
```

### yarn

```bash
yarn dlx k5e-cn@latest init
yarn dlx k5e-cn@latest add table-filter
```

## Troubleshooting

### Command not found

If you get a "command not found" error, try:

```bash
# Clear npm cache
npm cache clean --force

# Try with full package name
pnpm dlx k5e-cn@latest
```

### Build errors

Make sure all peer dependencies are installed:

```bash
pnpm install
```

### Components not working

Check that:
1. The JavaScript file is properly uploaded to kintone
2. You're on the correct kintone page/view
3. Browser console for any errors

## Next Steps

- [Quick Start Guide](/docs/getting-started/quick-start)
- [Browse Components](/docs/category/components)
- [TypeScript Guide](/docs/guides/typescript)