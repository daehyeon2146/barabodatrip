const target = 'http://localhost:50';

module.exports = {
  devServer: {
    port: 8082,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true
      },
      '^/upload': {
        target,
        changeOrigin: true,
      },
      '^/download': {
        target,
        changeOrigin: true,
      },
      '^/deleteFile': {
        target,
        changeOrigin: true,
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'ko_KR',
      fallbackLocale: 'ko_KR',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  }
}
