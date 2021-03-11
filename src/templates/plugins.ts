import type { Plugin } from '@nuxt/types'

import { prettyTimer } from 'nuxt-timings/runtime'

const plugin: string = '<%= options.plugin %>'
const mode = '<%= options.mode %>' as 'start' | 'end'

if (mode === 'start') {
  prettyTimer('time', 'plugins', 'importing', plugin)
} else {
  prettyTimer('timeEnd', 'plugins', 'importing', plugin)
}

export default <Plugin> function ({ res }) {
  if (mode === 'start') {
    prettyTimer('time', 'plugins', 'running', plugin)
  } else {
    prettyTimer('timeEnd', 'plugins', 'running', plugin)
  }
  res.timing[mode]('plugins-' + plugin.replace('~/', '').replace(/\//g, '-').replace('.js', ''), plugin)
}
