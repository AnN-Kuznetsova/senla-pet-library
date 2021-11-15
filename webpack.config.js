const path = require(`path`);
const bodyParser = require('body-parser');
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
      app.use(bodyParser.json());

      app.get(`/books`, function(req, res) {
        let p = path.join(__dirname, `mocks/books.json`);
        let a = require(p);
        res.send(a);
      });

      app.post(`/books`, function(req, res) {
        const newBookData = req.body.newBook;
        const booksCount = req.body.booksCount;
        const newBook = Object.assign(newBookData, {
          id: `b${booksCount + 1}`,
          isTaken: false,
        });
        res.send(newBook);
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
