import { addTemplate, useNuxt } from '@nuxt/kit'
import { extname, normalize, resolve } from 'pathe'

import type { NuxtOptionsPlugin } from '@nuxt/types/config/plugin'

function templateFile (
  src: string,
  fileName: string,
  options: Record<string, any>
) {
  const nuxt = useNuxt()
  const { dst } = addTemplate({ src, fileName, options })
  return resolve(nuxt.options.buildDir, dst)
}

export function registerPluginTimings () {
  const nuxt = useNuxt()

  nuxt.options.plugins = nuxt.options.plugins.reduce((plugins, plugin, index) => {
    const pluginName = (typeof plugin === 'string' ? plugin : plugin.src).replace(nuxt.options.buildDir + '/', '').replace('~/plugins/', '').replace('~/', '')

    const src = require.resolve('./templates/plugins')
    const before = templateFile(
      src,
      'timings-plugins-' + index + 'before.server' + extname(src),
      {
        plugin: normalize(pluginName),
        mode: 'start'
      }
    )
    const after = templateFile(
      src,
      'timings-plugins-' + index + 'after.server' + extname(src),
      {
        plugin: normalize(pluginName),
        mode: 'end'
      }
    )
    plugins.push(before, plugin, after)
    return plugins
  }, [] as NuxtOptionsPlugin[])
}
