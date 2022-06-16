import { addPlugin } from '@nuxt/kit'
import { extname } from 'pathe'

export function registerStoreTimings () {
  const src = require.resolve('./templates/store')
  addPlugin({
    src,
    fileName: 'timings-store.server' + extname(src)
  })
}
