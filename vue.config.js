const resolve = dir => require('path').join(__dirname, dir)
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('./src'),
        components: '@/components',
        assets: '@/assets',
        network: '@/network',
        views: '@/views',
        router: '@/router',
        store: '@/store'
      }
    }
  },
  transpileDependencies: ['@xdh/my'],
  chainWebpack(chain) {
    chain.resolve.alias.set('$ui', '@xdh/my/ui/lib')
  },
  lintOnSave: true
}
