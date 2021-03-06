function sanitizeString (string) {
  return string.replace(/\//g, '-')
}

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
    lastMutation = sanitizeString(mutation.type)
    res.timing.start(lastMutation, `${mutation.type} (mutation)`)
  }, { prepend: true })

  let lastAction = ''
  store.subscribeAction((action) => {
    if (lastAction) {
      res.timing.end(lastAction)
    }
    lastAction = sanitizeString(action.type)
    res.timing.start(lastAction, `${action.type} (action)`)
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
