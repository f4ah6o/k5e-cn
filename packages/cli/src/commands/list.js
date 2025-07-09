import chalk from 'chalk'
import { logger } from '../utils/logger.js'
import { getAllComponents, getComponentsByCategory } from '../utils/registry.js'
export async function list(options) {
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
    logger.error('Failed to list components')
    console.error(error)
    process.exit(1)
  }
}
//# sourceMappingURL=list.js.map
