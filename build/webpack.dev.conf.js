const webpack = require('webpack');
const merge = require('webpack-merge');
const BaseWebpackConfig = require('./webpack.base.conf');

const DevWebpackConfig = merge(BaseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: BaseWebpackConfig.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
});

module.exports = new Promise(resolve => {
  resolve(DevWebpackConfig);
});
