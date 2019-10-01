module.exports = {
  plugins: [
    require('autoprefixer'),
    require('sort-css-media-queries'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          }
        }
      ]
    })
  ]
}