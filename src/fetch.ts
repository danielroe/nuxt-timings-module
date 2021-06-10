import { addPlugin } from '@nuxt/kit'
import { extname } from 'upath'

export function registerFetchTimings () {
  const src = require.resolve('./templates/fetch')
  addPlugin({
    src,
    fileName: 'timings-fetch.server' + extname(src)
  })
}
