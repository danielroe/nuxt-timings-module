import { join } from 'path'

export default {
  alias: {
    'nuxt-timings': join(__dirname, '../src')
  },
  modules: [
    '@nuxt/typescript-build',
    '../src/index.ts'
  ],
  plugins: [
    '~/plugins/long-load',
    {
      src: '~/plugins/quick-load'
    }
  ],
  timings: {
    enabled: true
  }
}
