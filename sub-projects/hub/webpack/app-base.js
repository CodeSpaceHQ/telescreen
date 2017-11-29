const path = require('path');
const webpackMerge = require('webpack-merge');

const base = require('./base.js');

const appPath = path.resolve(__dirname, '../src/app');
const commonPath = path.resolve(__dirname, '../src/common');
const nodePath = path.resolve(__dirname, '../node_modules');
const buildPath = path.resolve(__dirname, '../public/app');

const appBase = webpackMerge(base, {
  // Allows for absolute paths from locations indicated in `resolve.modules`
  resolve: {
    modules: [
      appPath,
      commonPath,
      nodePath,
    ],
  },

  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js',
  },

  entry: {
    app: [
      './src/app/index.jsx',
    ],
  },
});

module.exports = appBase;
