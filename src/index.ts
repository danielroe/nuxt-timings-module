// eslint-disable-next-line
import type { Module } from '@nuxt/types'
import { defineNuxtModule } from '@nuxt/kit'

import { bold } from 'chalk'
import consola from 'consola'

import { name } from '../package.json'
import { registerFetchTimings } from './fetch'
import { registerPluginTimings } from './plugins'
import { registerStoreTimings } from './store'

const CONFIG_KEY = 'timings'
type ModuleOptions = {
  enabled?: boolean
}

export default defineNuxtModule(nuxt => ({
  name,
  configKey: CONFIG_KEY,
  defaults: { enabled: nuxt.options.dev },
  setup (options, nuxt) {
    if (!options.enabled) {
      return
    }

    consola.info(`Enabling ${bold('nuxt-timings')}.`)

    nuxt.options.server.timing = { total: true } as any

    registerPluginTimings()
    registerStoreTimings()
    registerFetchTimings()
  }
}))

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]?: ModuleOptions;
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]?: ModuleOptions;
  } // Nuxt 2.9 - 2.13
}

export type { ModuleOptions }
