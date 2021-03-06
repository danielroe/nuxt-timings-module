export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await new Promise(resolve => setTimeout(resolve, 500))
    dispatch('dispatchedAction')
  },
  dispatchedAction () {
    return 21
  }
}
