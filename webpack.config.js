const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var optimization = {
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      node_vendors: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'async',
        priority: 1
      }
    }
  }
};

module.exports = {
  mode: 'development',
  entry: {
    index: './app/index.js'
  },
  optimization: optimization,
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(html)$/,
        use: [
          { loader: 'html-loader' },
          {
            loader: 'string-replace-loader',
            options: {
              search: '@@API_URL',
              replace: 'http://localhost:9003/m1/'
            }
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      //filename: 'index.html',
      template: __dirname + '/app/index.html',
      inject: 'header'
    }),
    new CleanWebpackPlugin(['dist']),
    new ZipPlugin({
      filename: 'dist.zip'
    })
  ]
};