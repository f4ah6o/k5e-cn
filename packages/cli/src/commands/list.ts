import chalk from 'chalk'
import { logger } from '../utils/logger.js'
import { getAllComponents, getComponentsByCategory } from '../utils/registry.js'

interface ListOptions {
  category?: string
}

export async function list(options: ListOptions) {
  try {
    const components = options.category
      ? await getComponentsByCategory(options.category)
      : await getAllComponents()

    if (components.length === 0) {
      logger.warn(
        options.category
          ? `No components found in category "${options.category}"`
          : 'No components found'
      )
      return
    }

    logger.info(`Available components${options.category ? ` in ${options.category}` : ''}:`)
    logger.break()

    const categories = [...new Set(components.map((c) => c.category))]

    for (const category of categories) {
      const categoryComponents = components.filter((c) => c.category === category)
      console.log(chalk.bold.cyan(`  ${category}:`))

      for (const component of categoryComponents) {
        console.log(`    ${chalk.green(component.name)} - ${component.description}`)
        console.log(`      Events: ${chalk.gray(component.events.join(', '))}`)
      }
      logger.break()
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('ENOENT')) {
      logger.error('Failed to load component registry.')
      logger.info('This might be due to a corrupted installation. Please try reinstalling:')
      logger.info('  pnpm dlx k5e-cn@latest list')
    } else {
      logger.error('Failed to list components')
      logger.info(`Error details: ${error instanceof Error ? error.message : String(error)}`)
    }
    process.exit(1)
  }
}
