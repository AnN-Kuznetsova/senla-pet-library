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
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    hot: true,
    liveReload: true,
    port: 1337,
    historyApiFallback: true,

    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use(bodyParser.json());

      devServer.app.get('/books', function (req, res) {
        let p = path.join(__dirname, `mocks/books.json`);
        let a = require(p);
        res.send(a);
      });

      devServer.app.post('/books', function (req, res) {
        const newBookData = req.body.newBook;
        const lastBookId = req.body.lastBookId;
        const newBook = Object.assign(newBookData, {
          id: `b${Number.parseInt(lastBookId.replace(`b`, ``), 10) + 1}`,
          isTaken: false,
        });
        res.send(newBook);
      });

      devServer.app.delete('/books/:id', function (req, res) {
        const bookId = req.originalUrl.replace(`/books/`, ``);
        res.send(bookId);
      });

      devServer.app.get('/readers', function (req, res) {
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
      }/* , {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      } */
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
