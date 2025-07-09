# kintone Customization Project

This project was created with [@k5e/cn](https://github.com/f4ah6o/k5e-cn).

## Getting Started

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Adding Components

```bash
# List available components
pnpm dlx k5e-cn list

# Add a component
pnpm dlx k5e-cn add table-filter

# Add multiple components
pnpm dlx k5e-cn add table-filter form-validator
```

## Project Structure

```
.
├── src/
│   ├── index.js          # Main entry point
│   └── components/       # Components from @k5e/cn
├── dist/                 # Build output
│   └── bundle.js         # Upload this to kintone
├── package.json
└── vite.config.js
```

## Deployment

1. Run `pnpm build` to create the production bundle
2. Upload `dist/bundle.js` to your kintone app
3. Configure the JavaScript customization in kintone app settings

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run linter
- `pnpm lint:fix` - Fix linting issues
- `pnpm format` - Format code

## Learn More

- [kintone Developer Program](https://developer.cybozu.io/hc/ja)
- [@k5e/cn Documentation](https://f4ah6o.github.io/k5e-cn/)