const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: __dirname + "/src/index.tsx",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "bundle.js",//打包后输出文件的文件名
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8008
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.json', '.gif', '.html', '.png', '.webp', '.jpg',],
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(tsx|ts)/,
                exclude: [
                    path.resolve(__dirname, "src/pages/")
                ],
                use: [
                    { loader: "babel-loader" },
                    { loader: 'ts-loader' }
                ]
            },
            {
                test: /src(\\|\/)pages((\\|\/).*).(tsx|ts)/,
                use: [
                    'bundle-loader?lazy',
                    'babel-loader',
                    'ts-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' }, { loader: 'less-loader' }
                    ]
                })
            },
            {
                test: /\.(jpg|png|gif|jpeg|ico)?$/,
                use: [
                    { loader: `url-loader?limit=8190&name=images/[name].[hash:8].[ext]` }
                ]
            },

            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: "style-loader"
            //         }, {
            //             loader: "css-loader"
            //         }
            //     ]
            // }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // }),
        new ExtractTextPlugin({ filename: 'bundle.css', allChunks: true }),
        new webpack.DllReferencePlugin({
            manifest: require('./build/manifest.json'), // 指定manifest.json
            name: 'vendor',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            filename: "common.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
    ]
}