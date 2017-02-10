
'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './browser/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      GOOGLE_RATMAP_API_KEY: `${process.env.GOOGLE_RATMAP_API_KEY}`
    })
  ],
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
};
