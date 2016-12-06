'use strict'
const webpack = require('webpack')
const { resolve, join } = require('path')
const jspath = resolve('./static/js/')
const nodeModulesPath = join(__dirname, '..', 'node_modules')

module.exports = {
  entry: {
    common: [
      'jquery',
      'cookie',
      'tmpl'
    ],
    index: [
      join(jspath, 'index')
    ]
  },
  output: {
    path: resolve('./build/js/'), // 执行webpack的时候输出的文件路径
    filename: '[name].js', // 执行webpack的时候输出的文件名
    publicPath: '/js/', // Code Splitting 时候的文件载入路径  访问路径
    chunkFilename: '[name].js', // Code Splitting生成的文件名
  },
  resolve: {
    root: jspath,
    alias: {
      'jquery': 'lib/jquery',
      'cookie': 'lib/cookie',
      'tmpl': 'lib/tmpl'
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: Infinity
    })

    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })*/
  ],
  resolveLoader: {
    modulesDirectories: [nodeModulesPath]
  },
  module: {
    loaders: [{
      test: /\.(html|tpl)$/,
      loader: 'raw'
    }, {
      test: /\.json/,
      loader: 'json'
    }, {
      test: join(jspath, 'lib/jquery.js'),
      loader: 'expose-loader?$!expose-loader?jQuery'
    }]
  }
}

if (process.env.NODE_ENV === 'production') {

  module.exports.entry.index.push(join(nodeModulesPath, 'webpack-hot-middleware/client'))

  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
}
