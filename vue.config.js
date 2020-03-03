module.exports = {
  devServer: {
    host: 'localhost'
  },
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true
    }
  }
}
