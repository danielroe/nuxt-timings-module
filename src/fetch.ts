import { addPlugin } from '@nuxt/kit'
import { extname } from 'pathe'

export function registerFetchTimings () {
  const src = require.resolve('./templates/fetch')
  addPlugin({
    src,
    fileName: 'timings-fetch.server' + extname(src)
  })
}
