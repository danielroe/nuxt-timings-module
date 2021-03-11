import { extname } from 'upath'

import type { ModuleThis } from '@nuxt/types/config/module'

export function registerStoreTimings (this: ModuleThis) {
  const src = require.resolve('./templates/store')
  this.addPlugin({
    src,
    fileName: 'timings-store.server' + extname(src)
  })
}
