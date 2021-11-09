const path = require(`path`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: [`babel-polyfill`, `./src/index.tsx`],
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    inline: true,
    port: 1337,
    historyApiFallback: true,
    setup(app) {
      app.get(`/books`, function(req, res) {
        let p = path.join(__dirname, `mocks/books.json`);
        let a = require(p);
        res.send(a);
      });
      app.get(`/readers`, function(req, res) {
        let p = path.join(__dirname, `mocks/readers.json`);
        let a = require(p);
        res.send(a);
      });
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        }
      }, {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: {
          loader: `ts-loader`,
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'SENLA - pet-project Library',
        template: path.resolve(__dirname, './src/assets/index-template.html'),
        filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json'],
  },
  devtool: `source-map`,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};
