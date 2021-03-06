const plugin = '<%= options.plugin %>'
const mode = '<%= options.mode %>'

if (mode === 'start') {
  console.time(`importing ${plugin}`)
} else {
  console.timeEnd(`importing ${plugin}`)
}

/**
 * @type {import('@nuxt/types').Plugin}
 */
export default function ({ res }) {
  if (mode === 'start') {
    console.time(`running ${plugin}`)
  } else {
    console.timeEnd(`running ${plugin}`)
  }
  res.timing[mode](plugin)
}
