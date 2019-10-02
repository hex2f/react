const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  target: 'web',
  devtool: '#source-map',
  context: path.join(__dirname, '.'),
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].js'
  },
  resolve: {
    modules: [path.resolve('./node_modules')],
    alias: {
      '@views': path.resolve(__dirname, './src/views'),
      '@states': path.resolve(__dirname, './src/states'),
      '@components': path.resolve(__dirname, './src/components')
    },
    extensions: ['.js', '.jsx', '.json', '.sass']
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: { loader: 'babel-loader' }
      },
      {
        exclude: /node_modules/,
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: { historyApiFallback: true },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' })
  ]
}
