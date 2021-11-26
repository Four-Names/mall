module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'network':'@/network',
                'components':'@/components',
                'store':'@/store',
                'views':'@/views',
                'img': 'assets/img',
                'api':'@/api'
            }
        },
    },
    publicPath: './',
}