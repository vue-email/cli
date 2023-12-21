import { defineCommand } from 'citty'
import pkg from '../package.json' assert { type: 'json' }

export const main = defineCommand({
  meta: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  args: {
    name: {
      type: 'positional',
      description: 'Your name',
      required: true,
    },
    friendly: {
      type: 'boolean',
      description: 'Use friendly greeting',
    },
  },
  run({ args }) {
    console.log(`${args.friendly ? 'Hi' : 'Greetings'} ${args.name}!`)
  },
}) as any
