import Vue from 'vue'

import { prettyTimer, sanitizeString } from 'nuxt-timings'

function hasFetch (vm: Vue) {
  return vm.$options && typeof vm.$options.fetch === 'function' && !vm.$options.fetch.length
}

async function runFetchWithTimings (this: Vue) {
  const name = this.$options.name || ''
  prettyTimer('time', 'fetch', 'running', name)
  this.$ssrContext.res.timing.start(sanitizeString(name))
  await this.$options.__replaced_fetch.call(this)
  this.$ssrContext.res.timing.end(sanitizeString(name))
  prettyTimer('timeEnd', 'fetch', 'running', name)
}

if (!('__fetch_timings_installed' in Vue)) {
  (Vue as any).__fetch_timings_installed = true

  Vue.mixin({
    beforeCreate () {
      if (!hasFetch(this)) {
        return
      }
      this.$options.__replaced_fetch = this.$options.fetch
      this.$options.fetch = runFetchWithTimings
    }
  })
}
