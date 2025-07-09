import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import fs from 'fs-extra'
import prompts from 'prompts'
import { createSpinner, logger } from '../utils/logger.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export async function init(options) {
  logger.info('Initializing a new kintone project with @k5e/cn')
  logger.break()
  const response = await prompts([
    {
      type: options.name ? null : 'text',
      name: 'projectName',
      message: 'What is your project name?',
      initial: 'my-kintone-app',
      validate: (value) => {
        if (!value) return 'Project name is required'
        if (!/^[a-z0-9-_]+$/i.test(value)) {
          return 'Project name must contain only letters, numbers, hyphens, and underscores'
        }
        return true
      },
    },
    {
      type: options.typescript === undefined ? 'confirm' : null,
      name: 'useTypescript',
      message: 'Would you like to use TypeScript?',
      initial: true,
    },
  ])
  const projectName = options.name || response.projectName
  const useTypescript = options.typescript ?? response.useTypescript
  const projectPath = path.join(process.cwd(), projectName)
  if (await fs.pathExists(projectPath)) {
    logger.error(`Directory ${projectName} already exists`)
    process.exit(1)
  }
  const spinner = createSpinner('Creating project structure...')
  spinner.start()
  try {
    // Create project directory
    await fs.ensureDir(projectPath)
    // Copy template files
    const templatePath = path.join(__dirname, '../../templates/default')
    await fs.copy(templatePath, projectPath)
    // Create basic structure
    await fs.ensureDir(path.join(projectPath, 'src'))
    await fs.ensureDir(path.join(projectPath, 'dist'))
    // Create package.json
    const packageJson = {
      name: projectName,
      version: '0.1.0',
      private: true,
      type: 'module',
      scripts: {
        build: 'vite build',
        dev: 'vite',
        preview: 'vite preview',
        lint: 'biome check .',
        'lint:fix': 'biome check --apply .',
        format: 'biome format --write .',
      },
      devDependencies: {
        '@biomejs/biome': '^1.8.3',
        vite: '^5.3.0',
        ...(useTypescript && {
          typescript: '^5.5.0',
          '@types/kintone-js-sdk': '^1.0.0',
        }),
      },
    }
    await fs.writeJSON(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 })
    // Create biome.json
    const biomeConfig = {
      $schema: 'https://biomejs.dev/schemas/1.8.3/schema.json',
      organizeImports: {
        enabled: true,
      },
      linter: {
        enabled: true,
        rules: {
          recommended: true,
        },
      },
      formatter: {
        enabled: true,
        formatWithErrors: false,
        indentStyle: 'space',
        indentWidth: 2,
        lineWidth: 100,
        lineEnding: 'lf',
      },
    }
    await fs.writeJSON(path.join(projectPath, 'biome.json'), biomeConfig, { spaces: 2 })
    // Create tsconfig.json if TypeScript
    if (useTypescript) {
      const tsConfig = {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          lib: ['ES2022', 'DOM'],
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
        },
        include: ['src/**/*'],
        exclude: ['node_modules', 'dist'],
      }
      await fs.writeJSON(path.join(projectPath, 'tsconfig.json'), tsConfig, { spaces: 2 })
    }
    // Create vite.config.js
    const viteConfig = `import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.${useTypescript ? 'ts' : 'js'}',
      name: '${projectName}',
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
`
    await fs.writeFile(path.join(projectPath, 'vite.config.js'), viteConfig)
    // Create entry file
    const entryContent = `(() => {
  'use strict'

  console.log('kintone customization loaded')

  // Your code here
})()
`
    await fs.writeFile(
      path.join(projectPath, 'src', `index.${useTypescript ? 'ts' : 'js'}`),
      entryContent
    )
    // Create .gitignore
    const gitignore = `node_modules/
dist/
.DS_Store
*.log
.env
.env.local
`
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore)
    spinner.succeed('Project created successfully!')
    logger.break()
    logger.success(`Created ${chalk.bold(projectName)} at ${projectPath}`)
    logger.break()
    logger.info('Next steps:')
    console.log(`  ${chalk.gray('$')} cd ${projectName}`)
    console.log(`  ${chalk.gray('$')} pnpm install`)
    console.log(`  ${chalk.gray('$')} pnpm dlx k5e-cn add table-filter`)
    console.log(`  ${chalk.gray('$')} pnpm dev`)
    logger.break()
  } catch (error) {
    spinner.fail('Failed to create project')
    console.error(error)
    process.exit(1)
  }
}
//# sourceMappingURL=init.js.map
