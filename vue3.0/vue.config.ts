module.exports = {
    lintOnSave: false, // 关闭代码验证
    publicPath: process.env.BASE_URL,
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://192.168.0.106:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};