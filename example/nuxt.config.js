export default {
  alias: {
    'nuxt-timings': require.resolve('../src/index.ts')
  },
  modules: [
    '../src/index.ts',
    '@nuxt/typescript-build'
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
