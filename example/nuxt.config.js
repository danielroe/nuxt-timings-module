export default {
  alias: {
    'nuxt-timings/dist/runtime': require.resolve('../src/runtime'),
    'nuxt-timings': require.resolve('../src')
  },
  modules: [
    '../src',
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
