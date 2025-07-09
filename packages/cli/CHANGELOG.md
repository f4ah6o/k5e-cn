# k5e-cn

## 1.0.1

### Patch Changes

- Fix CI pipeline and update dependencies

  - Fix TypeScript type definitions for kintone global
  - Update Biome to v2.1.1 and migrate configuration
  - Fix import assertions syntax (assert → with)
  - Remove pnpm version specification from CI to avoid conflicts
  - Add Dependabot configuration for automated dependency updates
  - Fix various lint and format issues

## 1.0.0

### Major Changes

- Initial release of @k5e/cn - A shadcn/ui-inspired component library for kintone customization

  ### Features

  - **CLI Tool**: Initialize projects and manage components with `k5e-cn` command
    - `init`: Create new kintone projects with build setup
    - `add`: Add components to existing projects
    - `list`: List all available components
  - **First Component**: table-filter for advanced record list filtering
  - **TypeScript Support**: Full type definitions included
  - **Zero Dependencies**: Self-contained components using IIFE
  - **kintone Native**: Uses official kintone CSS classes

  ### Documentation

  - Comprehensive documentation at https://f4ah6o.github.io/k5e-cn/
  - Getting started guides
  - Component documentation

  This is the first stable release ready for production use.
