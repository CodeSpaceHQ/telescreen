const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const base = require('./app-base.js');
const values = require('./values.js');

const buildPath = path.resolve(__dirname, '../public/app');

const appDev = webpackMerge(base, {
  // Enables source maps that can be accessed in browser dev tools
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    port: 8080,
    host: '0.0.0.0',
    contentBase: buildPath,
    inline: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('dev'),
      HUB_URL: values.HUB_URL,
      HUB_APP_URL: values.HUB_APP_URL,
      CLIENT_URL: values.CLIENT_URL,
    }),
  ],
});

module.exports = appDev;
