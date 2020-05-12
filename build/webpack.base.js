
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const template = path.resolve(__dirname, '../src/index.html');
module.exports = {
    entry:{ 
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            // 将es6编译成es5 
            { 
                test: /\.jsx?$/,   // ?表示x有0个或一个
                exclude: /node_modules/,  // 不编译某个目录下的文件
                include: path.resolve(__dirname, '../src'),  // 只在include包含的目录下进行loader编译
                use: [
                    "babel-loader",
                ]
            }, 
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader' //typeScript
            },
            // 加载解析文件资源
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader', // 和file-loader功能相同，但更智能
                    options: {
                        // 配置打包后的文件名,具体可看webpack的file-loader文档
                        name: '[name].[ext]?[hash]',
                        outputPath: 'images/',
                        limit: 4096 // 当图片大小大于4k时将以文件形式输出，否则以base64输出
                    }
                }
            },
            // 引入字体，svg等文件
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            } 
        ]
    },
    optimization: { //通过使用tree-shaking,极大的减少代码的体积,使tree-shaking能生效，我们还要在webpack配置文件中开启：
        usedExports: true,
        splitChunks: { //js代码分割
            chunks: 'all',
            // chunks: 'async', // async表示只对异步代码进行分割
            minSize: 30000,  // 当超过指定大小时做代码分割
            // maxSize: 200000,  // 当大于最大尺寸时对代码进行二次分割
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {  // 缓存组：如果满足vendor的条件，就按vender打包，否则按default打包
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, // 权重越大，打包优先级越高
                    // filename: 'js/vender.js'  //将代码打包成名为vender.js的文件
                    name: 'vender'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    name: 'common',
                    // filename: 'js/common.js',
                    reuseExistingChunk: true // 是否复用已经打包过的代码
                }
            }
        },
    },
    plugins: [
        new CleanWebpackPlugin,
        new HtmlWebpackPlugin({
            template,
            filename: 'index.html'
        })
    ]
}
