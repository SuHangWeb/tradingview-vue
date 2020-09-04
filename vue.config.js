
module.exports = {
    publicPath: './', // 根域上下文目录
    lintOnSave: false,//是否在保存的时候使用 `eslint-loader` 进行检查。
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    indexPath: 'index.html',
    filenameHashing: true,//文件名哈希
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px-to-viewport')({
                        unitToConvert: 'px',// 默认值`px`，需要转换的单位
                        propList: ['*'],// 转化为vw的属性列表
                        viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750.
                        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334.
                        unitPrecision: 3, // (指定`px`转换为视窗单位值的小数位数（很多时候无法整除). 
                        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw. 
                        fontViewportUnit: 'vw',// 字体使用的视窗单位
                        selectorBlackList: ['.ignore', 'van', 'crop'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名.
                        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位 
                        mediaQuery: false, // 允许在媒体查询中转换`px`.
                        replace: true, // 是否直接更换属性值而不添加备用属性
                        exclude: [], // 忽略某些文件夹下的文件或特定文件
                        landscape: false, // 是否添加根据landscapeWidth生成的媒体查询条件 @media (orientation: landscape)
                        landscapeUnit: 'vw',// 横屏时使用的单位
                        landscapeWidth: 568// 横屏时使用的视窗宽度
                    }), // 换算的基数
                ]
            }
        }
    },
    devServer: {
        // overlay: { //关闭检查蒙层
        //     warnings: false,
        //     errors: false
        // },
        open: true, // 配置是否自动启动浏览器
        port: 8080, // 端口号
        host: '0.0.0.0',
        https: false, // 是否使用https, https使用node的一个内部默认的ca证书
        proxy: 'http://127.0.0.1:8080/' // 配置跨域处理,只有一个代理
        // proxy: { // 配置多个跨域代理
        //     '/api': {
        //         //要访问的跨域的api的域名
        //         target: 'http://127.0.0.1:8080',
        //         ws: true,
        //         secure: false, // http 检查 
        //         changOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // },
        // before: app => { }
    }
}