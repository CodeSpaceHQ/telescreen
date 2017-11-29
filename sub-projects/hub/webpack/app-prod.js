const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const base = require('./app-base.js');
const values = require('./values.js');

const appProd = webpackMerge(base, {

  plugins: [
    // Resolve global constant ENV to 'prod' during build
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prod'),
      HUB_URL: values.HUB_URL,
      HUB_APP_URL: values.HUB_APP_URL,
      CLIENT_URL: values.CLIENT_URL,
    }),
  ],
});

module.exports = appProd;
