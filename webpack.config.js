const path = require(`path`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  resolve: {
    extensions: [`.js`, `.jsx`],
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    inline: true,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
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
  devtool: `source-map`,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};
