const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const base = require('./client-base.js');

const clientProd = webpackMerge(base, {
  plugins: [
    // Resolve global constant ENV to 'prod' during build
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prod'),
    }),
  ],
});

module.exports = clientProd;
