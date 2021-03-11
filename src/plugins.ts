import { extname, resolve } from 'upath'

import type { NuxtOptions } from '@nuxt/types'
import type { ModuleThis } from '@nuxt/types/config/module'
import type { NuxtOptionsPlugin } from '@nuxt/types/config/plugin'

function templateFile (
  this: ModuleThis,
  src: string,
  fileName: string,
  options: Record<string, any>
) {
  const { dst } = this.addTemplate({
    src,
    fileName,
    options
  })
  return resolve(this.nuxt.options.buildDir, dst)
}

export function registerPluginTimings (this: ModuleThis) {
  const nuxtOptions = this.nuxt.options as NuxtOptions

  nuxtOptions.plugins = nuxtOptions.plugins.reduce((plugins, plugin, index) => {
    const pluginName = (typeof plugin === 'string' ? plugin : plugin.src).replace(nuxtOptions.buildDir + '/', '').replace('~/plugins/', '').replace('~/', '')

    const src = require.resolve('./templates/plugins')
    const before = templateFile.call(
      this,
      src,
      'timings-plugins-' + index + 'before.server' + extname(src),
      {
        plugin: pluginName,
        mode: 'start'
      }
    )
    const after = templateFile.call(
      this,
      src,
      'timings-plugins-' + index + 'after.server' + extname(src),
      {
        plugin: pluginName,
        mode: 'end'
      }
    )
    plugins.push(before, plugin, after)
    return plugins
  }, [] as NuxtOptionsPlugin[])
}
