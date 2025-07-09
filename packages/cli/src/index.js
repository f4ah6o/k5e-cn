#!/usr/bin/env node
import { Command } from 'commander'
import packageJson from '../package.json' with { type: 'json' }
import { add } from './commands/add.js'
import { init } from './commands/init.js'
import { list } from './commands/list.js'

const program = new Command()
program
  .name('k5e-cn')
  .description('CLI for @k5e/cn - kintone component library')
  .version(packageJson.version)
program
  .command('init')
  .description('Initialize a new kintone project with @k5e/cn')
  .option('-n, --name <name>', 'Project name')
  .option('-t, --typescript', 'Use TypeScript', true)
  .action(init)
program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add')
  .option('-a, --all', 'Add all available components')
  .option('-o, --overwrite', 'Overwrite existing files')
  .action(add)
program
  .command('list')
  .alias('ls')
  .description('List all available components')
  .option('-c, --category <category>', 'Filter by category')
  .action(list)
program.parse()
//# sourceMappingURL=index.js.map
