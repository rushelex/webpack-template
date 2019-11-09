const AutoPrefixer = require('autoprefixer');
const SortCssMediaQueries = require('sort-css-media-queries');
const CssNano = require('cssnano');

module.exports = {
  plugins: [
    AutoPrefixer,
    SortCssMediaQueries,
    CssNano({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
