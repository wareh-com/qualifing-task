const withTypescript = require('@zeit/next-typescript')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

module.exports = withTypescript(
  {
    webpack(config) {
      if (ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerPort: 8888,
            openAnalyzer: true
          })
        )
      }

      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()

        if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
          entries['main.js'].unshift('./client/polyfills.js')
        }

        return entries
      }

      return config
    }
  }
)
