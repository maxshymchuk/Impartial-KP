const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background.js',
    content: ['./src/content/hider.js'],
    loader: ['./src/content/loader.js'],
    popup: ['./src/popup/popup.js'],
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: 'src/popup/popup.html',
      filename: 'popup.html',
      excludeChunks: ['content', 'background', 'loader']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json' },
        { from: './src/assets/impartialkp16.png', to: 'assets/' },
        { from: './src/assets/impartialkp48.png', to: 'assets/' },
        { from: './src/assets/impartialkp128.png', to: 'assets/' },
      ],
    }),
  ],
  output: { filename: '[name].js', path: path.resolve(__dirname, 'build') },
};
