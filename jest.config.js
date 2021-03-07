module.exports = {
  preset: '@nuxt/test-utils',
  transform: {
    '\\.(js|ts)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    ]
  },
  moduleNameMapper: {
    'nuxt-timings': 'src/index.ts'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/*.ts']
}
