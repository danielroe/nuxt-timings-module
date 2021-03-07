import { setupTest, get } from '@nuxt/test-utils'

describe('Nuxt module', () => {
  setupTest({
    testDir: __dirname,
    fixture: '../example',
    server: true
  })

  test('should add timings to server response', async () => {
    const { headers } = await get('/')

    const timings = (headers['server-timing'] as string).match(/([^;]*)(;dur=\d*)(;desc=[^,]*)?, /g)

    expect(timings).toEqual(expect.arrayContaining([
      expect.stringContaining('plugins-long-load'),
      expect.stringContaining('plugins-quick-load'),
      expect.stringContaining('store-nuxtServerInit'),
      expect.stringContaining('store-dispatchedAction')
    ]))
  }, 50000)
})

describe('Disabled module', () => {
  setupTest({
    testDir: __dirname,
    fixture: '../example',
    server: true,
    config: {
      timings: {
        enabled: false
      }
    }
  })

  test('should not add timings to server response when disabled', async () => {
    const { headers } = await get('/')

    const timings = (headers['server-timing'] as string)

    expect(timings).toBeFalsy()
  }, 50000)
})
