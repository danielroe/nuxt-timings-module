import { resolve } from 'upath'

import type { ModuleThis } from '@nuxt/types/config/module'

export function registerFetchTimings (this: ModuleThis) {
  this.addPlugin({
    src: resolve(__dirname, '../dist/templates/fetch.js'),
    fileName: 'timings-fetch.server.js'
  })
}
