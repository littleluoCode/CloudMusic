const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            "/api": {
                target: 'http://1.117.169.27:3300', //目标接口域名
                secure: false,            //false为http访问，true为https访问
                changeOrigin: true,      //是否跨域
                //重写路径  
                pathRewrite: {
                    '^/api': 'http://1.117.169.27:3300'
                },
            },
        }
    }
})
