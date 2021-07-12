const path = require('path');

module.exports = {
  entry: {
    main: ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js'],
    note: ['core-js/stable', 'regenerator-runtime/runtime', './src/note.js'],
  },
  output: {
    path: path.resolve(__dirname,'public_html/assets/scripts'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/, 
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
            presets: ['@babel/env']
        } 
      }
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname,'public_html'),
    publicPath: '/assets/scripts'
  },
  devtool: 'source-map'
}
