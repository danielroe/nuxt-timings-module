import { Module, NuxtOptions } from '@nuxt/types'
import { ModuleThis } from '@nuxt/types/config/module'
import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin'

import chalk from 'chalk'
import consola from 'consola'
import defu from 'defu'
import { resolve } from 'upath'

import { name, version } from '../package.json'

const CONFIG_KEY = 'timings'
type ModuleOptions = {
  enabled?: boolean
}

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

const nuxtModule: Module<ModuleOptions> = function (moduleOptions) {
  const nuxtOptions = this.nuxt.options as NuxtOptions
  const providedOptions = defu(this.options[CONFIG_KEY] /* istanbul ignore next */ || {}, moduleOptions, { enabled: nuxtOptions.dev })

  if (!providedOptions.enabled) {
    return
  }

  consola.info(
    `Adding ${chalk.bold('timings')} to server responses.`
  )

  nuxtOptions.server.timing = { total: true }

  nuxtOptions.plugins = nuxtOptions.plugins.reduce((plugins, plugin, index) => {
    const pluginName = (typeof plugin === 'string' ? plugin : plugin.src).replace(nuxtOptions.buildDir + '/', '')

    const before = templateFile.call(
      this,
      '../templates/plugins.js',
      'timings-plugins-' + index + 'before.server.js',
      {
        plugin: pluginName,
        mode: 'start'
      }
    )
    const after = templateFile.call(
      this,
      '../templates/plugins.js',
      'timings-plugins-' + index + 'after.server.js',
      {
        plugin: pluginName,
        mode: 'end'
      }
    )
    plugins.push(before, plugin, after)
    return plugins
  }, [] as NuxtOptionsPlugin[])

  this.addPlugin({
    src: resolve(__dirname, '../templates/store.js'),
    fileName: 'timings-store.server.js'
  })
}
;(nuxtModule as any).meta = { name, version }

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]?: ModuleOptions;
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]?: ModuleOptions;
  } // Nuxt 2.9 - 2.13
}

export default nuxtModule

export { ModuleOptions }
