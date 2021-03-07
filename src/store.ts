import { resolve } from 'upath'

import type { ModuleThis } from '@nuxt/types/config/module'

export function registerStoreTimings (this: ModuleThis) {
  this.addPlugin({
    src: resolve(__dirname, '../dist/templates/store.js'),
    fileName: 'timings-store.server.js'
  })
}
