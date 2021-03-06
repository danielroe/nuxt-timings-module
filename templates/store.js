/**
 * @type {import('@nuxt/types').Plugin}
 */
export default function ({ store, res, beforeNuxtRender }) {
  if (!store) {
    return
  }

  let lastMutation = ''
  store.subscribe((mutation) => {
    if (lastMutation) {
      res.timing.end(lastMutation)
    }
    lastMutation = mutation.type
    res.timing.start(lastMutation, `${lastMutation} mutation`)
  }, { prepend: true })

  let lastAction = ''
  store.subscribeAction((action) => {
    if (lastAction) {
      res.timing.end(lastAction)
    }
    lastAction = action.type
    res.timing.start(lastAction, `${lastAction} action`)
  }, { prepend: true })

  beforeNuxtRender(() => {
    if (lastMutation) {
      res.timing.end(lastMutation)
    }
    if (lastAction) {
      res.timing.end(lastAction)
    }
  })
}
