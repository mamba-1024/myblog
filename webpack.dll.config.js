const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 公共库列表
const vendors = [
    'react',
    'react-dom',
    'react-router', 
    'react-router-redux',
    'react-redux',
    'antd',
    'classnames',
    'immutable',
    "redux-immutable",
    'redux-thunk',
    'antd/dist/antd.less',
    'rc-queue-anim',
    'babel-polyfill',
    'lodash',
    'axios'
];

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    filename: '[name].dll.js',
    path: __dirname + "/build", //打包后的文件存放的地方
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  module: {
      rules: [

        {
            test: /\.less$/, 
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader'}, { loader: 'less-loader' }
                ]
            })
        },
        {
            test: /\.css$/, 
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader' }
                ]
            })
        }
      ]
  },
  plugins: [
    new ExtractTextPlugin({
        filename: "[name].dll.css",
        allChunks: true,
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'build/manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',
      context: __dirname,
    }),
    // new HtmlWebpackPlugin({
    //     template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    // }),
  ],
}