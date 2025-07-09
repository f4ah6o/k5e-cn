import chalk from 'chalk'
import ora from 'ora'
export const logger = {
  info: (message) => {
    console.log(chalk.blue('ℹ'), message)
  },
  success: (message) => {
    console.log(chalk.green('✓'), message)
  },
  error: (message) => {
    console.log(chalk.red('✗'), message)
  },
  warn: (message) => {
    console.log(chalk.yellow('⚠'), message)
  },
  break: () => {
    console.log()
  },
}
export function createSpinner(text) {
  return ora({
    text,
    spinner: 'dots',
  })
}
//# sourceMappingURL=logger.js.map
