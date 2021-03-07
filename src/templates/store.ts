import type { ServerResponse } from 'http'
import type { Plugin } from '@nuxt/types'

import { prettyTimer, sanitizeString } from 'nuxt-timings'

export function processTiming (res: ServerResponse, oldTiming: string, _newTiming: string, description: string) {
  if (oldTiming) {
    res.timing.end(oldTiming)
    prettyTimer('timeEnd', 'store', 'running', oldTiming)
  }
  const newTiming = 'store-' + sanitizeString(_newTiming)
  prettyTimer('time', 'store', 'running', newTiming)
  res.timing.start(newTiming, description)
  return newTiming
}

export default <Plugin> function ({ store, res, beforeNuxtRender }) {
  if (!store) {
    return
  }

  let lastMutation = ''
  store.subscribe((mutation) => {
    lastMutation = processTiming(res, lastMutation, mutation.type, `${mutation.type} (mutation)`)
  }, { prepend: true })

  let lastAction = ''
  store.subscribeAction((action) => {
    lastAction = processTiming(res, lastAction, action.type, `${action.type} (action)`)
  }, { prepend: true })

  beforeNuxtRender(() => {
    [lastMutation, lastAction].forEach((name) => {
      if (!name) {
        return
      }
      res.timing.end(name)
      prettyTimer('timeEnd', 'store', 'running', name)
    })
  })
}
