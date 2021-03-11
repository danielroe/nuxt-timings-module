import { extname } from 'upath'

import type { ModuleThis } from '@nuxt/types/config/module'

export function registerFetchTimings (this: ModuleThis) {
  const src = require.resolve('./templates/fetch')
  this.addPlugin({
    src,
    fileName: 'timings-fetch.server' + extname(src)
  })
}
