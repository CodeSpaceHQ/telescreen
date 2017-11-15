const path = require('path');

const nodePath = path.resolve(__dirname, '../node_modules');
const appPath = path.resolve(__dirname, '../src/app');
const commonPath = path.resolve(__dirname, '../src/common');

const base = {
  // Allows for absolute paths from locations indicated in 'root'
  resolve: {
    modules: [
      appPath,
      commonPath,
      nodePath,
    ],
  },

  module: {
    /*
      Loaders for specific file endings. Each one can be composed
      of multiple other loaders. For example, the loader for css
      files uses style-loader and css-loader.
    */
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: nodePath,
        loader: 'babel-loader',
      },
      {
        // 'test' indicates the file type
        test: /\.css$/,
        /*
          When there are multiple loaders, the ‘loader’ key is replaced by
          the ‘use’ key. Each member of the ‘use’ array is an object
          containing the ‘loader’ key and possibly the ‘options’ key. The
          ‘options’ key is used to specify query parameters.
        */
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};

module.exports = base;
