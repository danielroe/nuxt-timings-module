import { resolve } from 'upath'

import type { NuxtOptions } from '@nuxt/types'
import type { ModuleThis } from '@nuxt/types/config/module'
import type { NuxtOptionsPlugin } from '@nuxt/types/config/plugin'

function templateFile (
  this: ModuleThis,
  relativeSrc: string,
  fileName: string,
  options: Record<string, any>
) {
  const { dst } = this.addTemplate({
    src: resolve(__dirname, relativeSrc),
    fileName,
    options
  })
  return resolve(this.nuxt.options.buildDir, dst)
}

export function registerPluginTimings (this: ModuleThis) {
  const nuxtOptions = this.nuxt.options as NuxtOptions

  nuxtOptions.plugins = nuxtOptions.plugins.reduce((plugins, plugin, index) => {
    const pluginName = (typeof plugin === 'string' ? plugin : plugin.src).replace(nuxtOptions.buildDir + '/', '').replace('~/plugins/', '').replace('~/', '')

    const before = templateFile.call(
      this,
      '../dist/templates/plugins.js',
      'timings-plugins-' + index + 'before.server.js',
      {
        plugin: pluginName,
        mode: 'start'
      }
    )
    const after = templateFile.call(
      this,
      '../dist/templates/plugins.js',
      'timings-plugins-' + index + 'after.server.js',
      {
        plugin: pluginName,
        mode: 'end'
      }
    )
    plugins.push(before, plugin, after)
    return plugins
  }, [] as NuxtOptionsPlugin[])
}
