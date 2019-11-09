const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BaseWebpackConfig = require('./webpack.base.conf');

const BuildWebpackConfig = merge(BaseWebpackConfig, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});

module.exports = new Promise(resolve => {
  resolve(BuildWebpackConfig);
});
