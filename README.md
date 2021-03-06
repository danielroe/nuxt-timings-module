[![nuxt-timings](https://timings.nuxtjs.org/preview.png)](https://timings.nuxtjs.org)

# nuxt-timings

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Full visibility into your Nuxt render time for optimising performance

## Features

- Uses Nuxt `server.timings` to inject additional timings
- Adds timings for Nuxt plugins and Vuex actions/mutations

## Quick setup

1. Add `nuxt-timings` dependency to your project

```bash
yarn add nuxt-timings # or npm install nuxt-timings
```

2. Add `nuxt-timings` to the `buildModules` section of `nuxt.config.js`

```js
{
  buildModules: [
    'nuxt-timings',
  ],
  timings: {
    // default value
    enabled: process.env.NODE_ENV === 'development'
  }
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Start development server using `yarn dev`

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-timings/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-timings

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-timings.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-timings

[github-actions-ci-src]: https://github.com/danielroe/nuxt-timings-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/danielroe/nuxt-timings-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/danielroe/nuxt-timings-module.svg
[codecov-href]: https://codecov.io/gh/danielroe/nuxt-timings-module

[license-src]: https://img.shields.io/npm/l/nuxt-timings.svg
[license-href]: https://npmjs.com/package/nuxt-timings
