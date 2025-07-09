# CLAUDE.md

## Project Overview

This project is a shadcn/ui-inspired component library for kintone customization. It provides copy-paste components that developers can easily integrate into their kintone applications.

**Project Name**: @k5e/cn

## Core Concepts

### Philosophy (from shadcn/ui)
- **Copy & Paste, not npm install**: Components are copied directly into your project
- **Full ownership**: You own and control the code
- **Customization first**: Easy to modify for your specific needs
- **No black box**: All dependencies and code are transparent

### kintone-Specific Principles
- Follow [kintone official style guide](https://cybozu.dev/ja/kintone/sdk/library/plugin-stylesheet-guide/)
- All components wrapped in IIFE to prevent global pollution
- TypeScript-first development
- Desktop-first (mobile support planned for later)

## Technical Stack

- **Package Manager**: pnpm
- **Build Tool**: Vite
- **Code Quality**: Biome
- **Language**: TypeScript
- **Documentation**: Docusaurus (MDX + React)

## Project Structure

```
k5e-cn/
├── apps/
│   └── www/                    # Documentation site (Docusaurus)
│       ├── docs/               # MDX documentation files
│       │   ├── components/     # Component docs
│       │   └── guides/         # Usage guides
│       ├── src/
│       │   ├── components/     # React components for docs
│       │   ├── css/
│       │   └── pages/
│       ├── static/             # Static assets
│       ├── docusaurus.config.js
│       └── sidebars.js
├── packages/
│   └── cli/                    # CLI tool
├── components/                 # Actual component code
│   ├── table-filter.ts
│   ├── form-validator.ts
│   ├── conditional-fields.ts
│   ├── bulk-update.ts
│   └── export-enhanced.ts
├── registry/                   # Component registry
│   └── index.json
└── templates/                  # Project templates
    └── default/
```

## Component Guidelines

### Structure
Each component should:
1. Be wrapped in IIFE
2. Use kintone official CSS classes
3. Include TypeScript definitions
4. Be self-contained (minimal dependencies)
5. Auto-register kintone events when appropriate

### Example Component Template
```typescript
(() => {
  'use strict';

  interface Config {
    // Component configuration
  }

  const defaultConfig: Config = {
    // Default settings
  };

  // Component implementation
  const init = (event: any, config: Config = defaultConfig) => {
    // Use kintone official style classes
    // e.g., kintoneplugin-select, kintoneplugin-button
    return event;
  };

  // Auto-register if appropriate
  kintone.events.on(['relevant.events'], init);
})();
```

## Initial Components (Priority Order)

1. **table-filter**: Advanced filtering for record lists
   - Multi-field filtering
   - Save/load filter presets
   - Real-time filtering

2. **form-validator**: Form validation
   - Custom validation rules
   - Real-time validation feedback
   - Cross-field validation

3. **conditional-fields**: Show/hide fields based on conditions
   - Complex condition logic
   - Field dependency management
   - Performance optimized

4. **bulk-update**: Bulk record updates UI
   - Select multiple records
   - Batch operations
   - Progress indication

5. **export-enhanced**: Enhanced CSV/Excel export
   - Custom column selection
   - Formatting options
   - Related records inclusion

## CLI Commands

```bash
# Initialize project
pnpm dlx k5e-cn@latest init

# Add single component
pnpm dlx k5e-cn@latest add table-filter

# Add multiple components
pnpm dlx k5e-cn@latest add table-filter form-validator

# List available components
pnpm dlx k5e-cn@latest list
```

## Development Guidelines

### Code Style
- Use Biome for formatting and linting
- Follow TypeScript strict mode
- Prefer const assertions
- Use meaningful variable names in implementations

### Testing
- Test in actual kintone environment
- Consider different app configurations
- Test with various data volumes

### Documentation
- Each component needs:
  - Basic usage example
  - Configuration options
  - kintone events used
  - Browser compatibility notes
  - Live preview in Docusaurus (using React components)

### Documentation Site

Using Docusaurus for documentation:
- MDX support for mixing Markdown and React
- Component live previews
- Copy button for code snippets
- Search functionality
- GitHub Pages deployment

Example MDX component documentation:
```mdx
import ComponentPreview from '@site/src/components/ComponentPreview';
import CodeBlock from '@theme/CodeBlock';

# Table Filter

Advanced filtering component for kintone record lists.

<ComponentPreview 
  component="table-filter"
  height={400}
/>

## Installation

<CodeBlock language="bash">
pnpm dlx k5e-cn@latest add table-filter
</CodeBlock>

## Usage

The component automatically initializes on record list pages.
```

## Contribution

Following shadcn/ui model:
- **Issues**: Bug reports, feature requests, component proposals
- **Pull Requests**: New components, improvements, fixes
- **Discussions**: Questions, ideas, best practices

## Future Considerations

### Phase 1 (Current)
- Core CLI functionality
- 5 initial components
- Basic documentation site with Docusaurus
- GitHub Pages deployment

### Phase 2
- Mobile support
- Plugin support
- Component dependencies management
- Enhanced documentation with interactive examples

### Phase 3
- Integration with kintone dev server project
- Advanced component examples
- Performance optimization tools

## Notes

- Always use "kintone" (not "Kintone" or "KINTONE")
- Respect kintone's CSP policies
- Consider cybozu.com domain restrictions
- Keep components lightweight

## Related Projects

- [shadcn/ui](https://github.com/shadcn-ui/ui) - Inspiration
- [kintone developer program](https://developer.cybozu.io/hc/ja)
- kintone dev server project (in development)
