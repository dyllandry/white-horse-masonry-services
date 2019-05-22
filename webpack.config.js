const path = require(`path`)
const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const ImageminPlugin = require(`imagemin-webpack-plugin`).default
const CopyPlugin = require(`copy-webpack-plugin`)
const CleanPlugin = require(`clean-webpack-plugin`)

module.exports = {
  mode: `development`,
  entry: {
    home: `./src/pages/home.js`,
    fullGallery: `./src/pages/full-gallery.js`
  },
  output: {
    path: path.resolve(__dirname, `dist`),
    filename: `[name].js`
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['fullGallery'],
      filename: './full-gallery.html',
      template: `./src/pages/full-gallery.pug`,
      title: 'White Horse Masonry — Gallery'
    }),
    new HtmlWebpackPlugin({
      chunks: ['home'],
      filename: './index.html',
      title: 'White Horse Masonry',
      template: `./src/pages/home.pug`
    }),
    new ImageminPlugin({test: /\.(png|jpg|jpeg)$/}),
    new CopyPlugin([
      { from: `src/files-to-paste-in-dist/`, to: `./` }
    ]),
    new CleanPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [`pug-loader`]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, `src`, `pages`, `styles`)]
            }
          }
        ]
      },
      {
        test: /\.(gif|svg)$/,
        use: `url-loader`
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            sizes: [400, 600, 800, 1200],
            placeholder: true,
            placeholderSize: 25,
            name: 'images/[name]-[width].[ext]'
          }
        }
      }
    ]
  }
}
