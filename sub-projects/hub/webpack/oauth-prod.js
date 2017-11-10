const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const base = require('./oauth-base.js');

const oauthProd = webpackMerge(base, {
  plugins: [
    // Resolve global constant ENV to 'prod' during build
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prod'),
    }),
  ],
});

module.exports = oauthProd;
