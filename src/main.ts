import { defineCommand } from 'citty'
import pkg from '../package.json' assert { type: 'json' }
import { commands } from './commands'

export const main = defineCommand({
  meta: {
    name: 'vue-email',
    version: pkg.version,
    description: pkg.description,
  },
  subCommands: commands,
}) as any
