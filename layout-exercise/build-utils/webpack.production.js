const CompressionPlugin = require("compression-webpack-plugin");

module.exports = () => ({
  plugins: [
    new CompressionPlugin({
      test: /\.js$/,
      asset: '[path].gz[query]',
      algorithm: 'gzip'
    })
  ]
});
