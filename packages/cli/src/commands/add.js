import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import fs from 'fs-extra'
import prompts from 'prompts'
import { createSpinner, logger } from '../utils/logger.js'
import { getAllComponents, getComponent } from '../utils/registry.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export async function add(components, options) {
  const cwd = process.cwd()
  // Check if we're in a valid project
  if (!(await fs.pathExists(path.join(cwd, 'package.json')))) {
    logger.error('No package.json found. Are you in a kintone project?')
    logger.info('Run "k5e-cn init" to create a new project')
    process.exit(1)
  }
  let selectedComponents = components
  // If no components specified and not --all, show selection prompt
  if (components.length === 0 && !options.all) {
    const allComponents = await getAllComponents()
    const response = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Which components would you like to add?',
      choices: allComponents.map((c) => ({
        title: `${c.name} - ${c.description}`,
        value: c.name,
      })),
      min: 1,
    })
    if (!response.components || response.components.length === 0) {
      logger.warn('No components selected')
      process.exit(0)
    }
    selectedComponents = response.components
  } else if (options.all) {
    const allComponents = await getAllComponents()
    selectedComponents = allComponents.map((c) => c.name)
  }
  const spinner = createSpinner('Adding components...')
  spinner.start()
  const srcDir = path.join(cwd, 'src', 'components')
  await fs.ensureDir(srcDir)
  let addedCount = 0
  let skippedCount = 0
  for (const componentName of selectedComponents) {
    try {
      const component = await getComponent(componentName)
      if (!component) {
        spinner.warn(`Component "${componentName}" not found`)
        continue
      }
      for (const file of component.files) {
        const sourcePath = path.join(__dirname, '../../', file)
        const fileName = path.basename(file)
        const destPath = path.join(srcDir, fileName)
        if ((await fs.pathExists(destPath)) && !options.overwrite) {
          logger.warn(`Skipped ${fileName} (already exists)`)
          skippedCount++
          continue
        }
        await fs.copy(sourcePath, destPath)
        addedCount++
      }
    } catch (error) {
      spinner.fail(`Failed to add ${componentName}`)
      console.error(error)
    }
  }
  spinner.stop()
  if (addedCount > 0) {
    logger.success(`Added ${addedCount} component${addedCount > 1 ? 's' : ''}`)
  }
  if (skippedCount > 0) {
    logger.warn(`Skipped ${skippedCount} existing file${skippedCount > 1 ? 's' : ''}`)
    logger.info('Use --overwrite to replace existing files')
  }
  if (addedCount > 0) {
    logger.break()
    logger.info('Components added to: src/components/')
    logger.info('Import them in your main file to use')
    // Show usage example
    logger.break()
    logger.info('Example usage:')
    console.log(
      chalk.gray(`
// src/index.js
import './components/table-filter.js'
import './components/form-validator.js'
`)
    )
  }
}
//# sourceMappingURL=add.js.map
