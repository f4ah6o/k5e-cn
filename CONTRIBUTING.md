# Contributing to @k5e/cn

Thank you for your interest in contributing to @k5e/cn! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the project:
   ```bash
   pnpm build
   ```

## Project Structure

- `packages/cli` - CLI tool source code
- `components/` - Component implementations
- `apps/www` - Documentation website
- `templates/` - Project templates for CLI
- `registry/` - Component registry

## Development Workflow

### Working on Components

1. Create a new component file in `components/`
2. Follow the existing component structure (IIFE, TypeScript)
3. Add component to `registry/index.json`
4. Create documentation in `apps/www/docs/components/`

### Testing Components

1. Use the CLI to test component installation:
   ```bash
   pnpm build
   node packages/cli/dist/index.js add your-component
   ```

2. Test in a real kintone environment

### Working on CLI

1. Make changes in `packages/cli/src/`
2. Build and test:
   ```bash
   pnpm build
   pnpm test
   ```

### Documentation

1. Run documentation site locally:
   ```bash
   pnpm docs:dev
   ```

2. Documentation uses MDX format
3. Add examples and live demos where possible

## Code Style

- We use Biome for linting and formatting
- Run `pnpm lint:fix` before committing
- Follow TypeScript strict mode
- Use meaningful variable names

## Commit Convention

We follow Conventional Commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process/auxiliary tool changes

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the guidelines above
3. Update documentation if needed
4. Ensure all checks pass:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm build
   ```
5. Submit a pull request with a clear description

## Component Guidelines

### Structure

Each component should:
- Be wrapped in IIFE to prevent global pollution
- Use kintone official CSS classes
- Include TypeScript definitions
- Be self-contained with minimal dependencies
- Auto-register kintone events when appropriate

### Example Template

```typescript
(() => {
  'use strict'

  interface Config {
    // Component configuration
  }

  const defaultConfig: Config = {
    // Default settings
  }

  class ComponentName {
    constructor(config: Config = {}) {
      // Implementation
    }

    init(event: any) {
      // Initialization logic
      return event
    }
  }

  // Auto-register if appropriate
  const instance = new ComponentName()
  kintone.events.on(['app.record.index.show'], (event) => instance.init(event))
})()
```

## Testing

- Test components in actual kintone environments
- Consider different app configurations
- Test with various data volumes
- Check browser compatibility

## Questions?

Feel free to:
- Open an issue for bugs or feature requests
- Start a discussion for questions
- Contact maintainers

Thank you for contributing!