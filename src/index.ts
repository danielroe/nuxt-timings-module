import type { Module, NuxtOptions } from '@nuxt/types'

import { bold } from 'chalk'
import consola from 'consola'
import defu from 'defu'

import { name, version } from '../package.json'
import { registerFetchTimings } from './fetch'
import { registerPluginTimings } from './plugins'
import { registerStoreTimings } from './store'

const CONFIG_KEY = 'timings'
type ModuleOptions = {
  enabled?: boolean
}

const nuxtModule: Module<ModuleOptions> = function (moduleOptions) {
  const nuxtOptions = this.nuxt.options as NuxtOptions
  const providedOptions = defu(this.options[CONFIG_KEY] /* istanbul ignore next */ || {}, moduleOptions, { enabled: nuxtOptions.dev })

  if (!providedOptions.enabled) {
    return
  }

  consola.info(`Enabling ${bold('nuxt-timings')}.`)

  nuxtOptions.server.timing = { total: true }

  registerPluginTimings.call(this)
  registerStoreTimings.call(this)
  registerFetchTimings.call(this)
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

export type { ModuleOptions }
export * from './utils'
