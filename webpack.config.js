const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env'], '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader',]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    compress: true,
    port: 8080,
    proxy: {
      '/**': 'http://localhost:3000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
