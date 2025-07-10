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

## Development Philosophy

### Code That Fits in Your Head

Following the principles from "Code That Fits in Your Head" for sustainable, comprehensible code:

#### Managing Complexity
- Recognize the limits of human cognitive capacity
- Code must fit in your head and be understandable by humans
- Prioritize readability and comprehension over pure technical optimization

#### Development Approach
- Start with minimal vertical slices (complete features from UI to backend)
- Use incremental development with continuous integration
- Practice regular refactoring
- Follow the Red/Green/Refactor methodology

#### Coding Practices
- Leverage checklists to maximize existing skills
- Implement comprehensive testing
- Make small, frequent Git commits
- Maintain proper encapsulation
- Minimize cyclomatic complexity

#### API Design Principles
- Design APIs with clear affordances
- Separate concerns effectively
- Write code that clearly communicates intent
- Protect invariant conditions

#### Team Development
- Practice pair programming and mob programming
- Take regular breaks
- Maintain consistent development rhythm

Reference: https://www.oreilly.co.jp/books/9784814400799/

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

## Important: Difference from shadcn/ui

While k5e-cn is inspired by shadcn/ui, there's a fundamental difference in the `init` command:

| Command | Purpose | What it does | Prerequisites |
|---------|---------|--------------|---------------|
| **k5e-cn init** | Project generator | Creates a NEW project from scratch with complete directory structure, build config, and starter files | None - creates everything |
| **shadcn/ui init** | Project configurator | Configures an EXISTING React/Next.js project to use shadcn/ui components | Requires existing React project |

### Why this difference?

- **k5e-cn**: Designed for developers starting fresh kintone customizations. Similar to `create-react-app` or `create-next-app`.
- **shadcn/ui**: Assumes you already have a React project and just want to add the component system.

This reflects the different ecosystems:
- kintone developers often start from zero with each customization
- React developers typically already have a project setup when they discover shadcn/ui

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

## Development Progress

### Completed Tasks (2025-07-09)

#### 1. Project Setup
- ✅ Monorepo structure with pnpm workspace
- ✅ TypeScript configuration
- ✅ Biome for code formatting and linting
- ✅ Git repository initialization

#### 2. CLI Tool Implementation
- ✅ Created `k5e-cn` CLI package
- ✅ Implemented commands:
  - `init`: Initialize new kintone project
  - `add`: Add components to existing project
  - `list`: List available components
- ✅ Component registry system
- ✅ Template system for project initialization

#### 3. First Component
- ✅ Implemented `table-filter` component
  - Real-time filtering with debounce
  - Multi-keyword search (space-separated)
  - Filter state persistence (localStorage)
  - Result count display
  - kintone official styling

#### 4. Documentation Site
- ✅ Docusaurus setup
- ✅ GitHub Pages deployment
- ✅ Automatic deployment via GitHub Actions
- ✅ Component documentation structure
- ✅ Getting started guides

#### 5. npm Publication
- ✅ Package configuration for npm
- ✅ Changesets for version management
- ✅ GitHub Actions for automated releases
- ✅ .npmignore and build scripts
- ✅ LICENSE file (MIT)
- ✅ Published to npm registry as `k5e-cn`
- ✅ Released v1.0.0 and v1.0.1

### Current Status

**Documentation Site**: https://f4ah6o.github.io/k5e-cn/

**npm Package**: 
- Published to npm as `k5e-cn`
- Version: 1.0.1
- Install: `pnpm dlx k5e-cn@latest`

### Latest Updates (2025-07-09)

#### CI/CD Improvements
- ✅ Fixed CI pipeline errors (typecheck and lint)
- ✅ Updated Biome from 1.8.3 to 2.1.1
- ✅ Added global TypeScript definitions for kintone
- ✅ Fixed import assertions syntax (assert → with)
- ✅ Configured Dependabot for automated dependency updates

#### npm Package v1.0.1
- ✅ Published first patch release
- ✅ Fixed CI/CD pipeline
- ✅ Improved build process stability
- ✅ Updated all dependencies

### Next Steps

1. **Remaining Components Implementation**:
   - form-validator
   - conditional-fields
   - bulk-update
   - export-enhanced

2. **Enhanced Documentation**:
   - Interactive component previews
   - More detailed guides
   - Video tutorials

3. **Community Building**:
   - Example projects
   - Component contribution guide
   - Discord/Slack community
