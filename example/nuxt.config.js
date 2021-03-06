export default {
  modules: [
    '../src/index.ts'
  ],
  plugins: [
    '~/plugins/long-load',
    '~/plugins/quick-load'
  ],
  timings: {
    enabled: true
  }
}
