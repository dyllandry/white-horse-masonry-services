const path = require(`path`)
const HtmlWebpackPlugin = require(`html-webpack-plugin`)

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
    })
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
        test: /\.(png|jp(e*)g)$/,
        loader: `file-loader`
      }
    ]
  }
}
