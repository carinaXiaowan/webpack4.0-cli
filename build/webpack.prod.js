const merge = require('webpack-merge');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//分割css代码块
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const TerserPlugin = require('terser-webpack-plugin');  //压缩js
// 使webpack开启gizp
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge({
    mode: 'production',
    output: {
        filename: 'js/[name]_[contenthash].js',  // 入口和内容hash组成的文件名，也可以是hash
        chunkFilename: 'js/[name]_[contenthash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [  // loader解析的顺序是从下到上，从右到左的顺序
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            filename: '[name].css',
                            chunkFilename: '[name].css',
                            publicPath: '../'   //****最后打包的时候替换引入文件路径
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2   //该方式可以让@import引入的css文件再次执行一边css打包loader
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    optimization:{
        minimizer: [
            new TerserPlugin({   // 压缩js代码
                cache: true,   // 启用文件缓存
                parallel: true,  // 使用多进程并行执行任务来提高构建效率
                sourceMap: true,  // 将错误消息位置映射到模块
                terserOptions: {
                    drop_console: true,  // 打包时剔除所有console.log
                    drop_debugger: true  // 打包时剔除所有debugger
                }
            }),
            new OptimizeCSSAssetsPlugin({})  // 压缩css代码
        ]
    },
    plugins: [
        // 将js中的css代码剖离成单独的文件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name]_[hash].css',
            chunkFilename: 'css/[name]_[hash].chunk.css',
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/i,
            algorithm: 'gzip'
        }),
    ]
}, base)    