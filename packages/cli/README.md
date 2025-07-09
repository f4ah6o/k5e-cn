# k5e-cn CLI

CLI tool for [@k5e/cn](https://github.com/f4ah6o/k5e-cn) - A shadcn/ui-inspired component library for kintone customization.

## Installation

```bash
# Using pnpm (recommended)
pnpm dlx k5e-cn@latest

# Using npm
npx k5e-cn@latest

# Using yarn
yarn dlx k5e-cn@latest
```

## Usage

### Initialize a new project

```bash
k5e-cn init [project-name]
```

Options:
- `-n, --name <name>` - Project name
- `-t, --typescript` - Use TypeScript (default: true)

### Add components

```bash
# Add specific components
k5e-cn add table-filter form-validator

# Add all components
k5e-cn add --all

# Overwrite existing files
k5e-cn add table-filter --overwrite
```

### List available components

```bash
# List all components
k5e-cn list

# Filter by category
k5e-cn list --category form
```

## Available Components

- **table-filter** - Advanced filtering for record lists
- **form-validator** - Form validation with custom rules
- **conditional-fields** - Show/hide fields based on conditions
- **bulk-update** - Bulk record updates UI
- **export-enhanced** - Enhanced CSV/Excel export

## Documentation

For detailed documentation and examples, visit [https://f4ah6o.github.io/k5e-cn/](https://f4ah6o.github.io/k5e-cn/)

## License

MIT © k5e-cn contributors