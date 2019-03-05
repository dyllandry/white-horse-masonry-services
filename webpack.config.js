const path = require(`path`)
const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const ImageminPlugin = require(`imagemin-webpack-plugin`).default
const CopyPlugin = require(`copy-webpack-plugin`)
const CleanPlugin = require(`clean-webpack-plugin`)

module.exports = {
  mode: `development`,
  entry: {
    home: `./src/pages/home.js`
  },
  output: {
    path: path.resolve(__dirname, `dist`),
    filename: `[name].js`
  },
  plugins: [
    new HtmlWebpackPlugin({
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
        test: /\.(png|jp(e*)g|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            sizes: [400, 600, 800],
            placeholder: true,
            placeholderSize: 25,
            name: 'images/[name]-[width].[ext]'
          }
        }
      }
    ]
  }
}
