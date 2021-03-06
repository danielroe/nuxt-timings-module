import { setupTest, get } from '@nuxt/test-utils'

const mockReporter = {
  error: jest.fn(),
  info: jest.fn(),
  success: jest.fn()
}

jest.mock('consola', () => ({
  info: jest.fn(),
  success: jest.fn(),
  debug: jest.fn(),
  withTag: jest.fn().mockImplementation(() => mockReporter)
}))

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
      expect.stringContaining('nuxtServerInit'),
      expect.stringContaining('dispatchedAction')
    ]))
  }, 50000)
})
