import { outputFile } from 'fs-extra'
import { config } from '@vue-email/compiler'
import { defineCommand } from 'citty'
import { resolve } from 'pathe'
import pretty from 'pretty'
import { consola } from 'consola'
import fg from 'fast-glob'

export default defineCommand({
  meta: {
    name: 'export',
    description: 'Generates the plain HTML files of your emails into a out directory.',
  },
  args: {
    dir: {
      type: 'string',
      description: 'The directory where the emails are located.',
      default: 'emails',
    },
    out: {
      type: 'string',
      description: 'The directory where the emails will be exported.',
      default: 'out',
    },
    pretty: {
      type: 'boolean',
      description: 'Prettify the HTML output.',
      default: false,
    },
    text: {
      type: 'boolean',
      description: 'Generate text version of the email.',
      default: false,
    },
  },
  async run(ctx) {
    const cwd = resolve('.')

    const dir = resolve(cwd, ctx.args.dir)
    const out = resolve(cwd, ctx.args.out)
    const prettyArg = ctx.args.pretty
    const textArg = ctx.args.text

    const vueEmail = config(dir, { verbose: false })
    const emails = await fg(['**/*.vue'], { cwd: dir })

    if (!emails.length) {
      consola.error(`No Emails found in ${dir}`)
      process.exit(1)
    }

    if (textArg)
      consola.info(`✨ Generating text versions of emails`)
    else
      consola.info(`✨ Generating HTML versions of emails`)

    for (const email of emails) {
      const rendered = await vueEmail.render(email)
      const html = rendered.html
      const text = rendered.text
      const name = email.replace('.vue', '')
      const fileName = textArg ? `${name}.txt` : `${name}.html`

      if (textArg)
        await outputFile(resolve(out, fileName), text)
      else
        await outputFile(resolve(out, fileName), prettyArg ? pretty(html) : html)

      consola.info(`🪄 Generated ${name}`)
    }
  },

})
