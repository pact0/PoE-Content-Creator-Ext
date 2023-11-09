const { resolve } = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "src"),
    historyApiFallback: true,
  },

  entry: {
    background: resolve(__dirname, "src/background.ts"),
    otherSites: resolve(__dirname, "src/otherSites.ts"),

    navBarPopup: resolve(__dirname, "src/navBarPopup/index.tsx"),
    optionsPage: resolve(__dirname, "src/optionsPage/index.tsx"),
    injectedMenu: resolve(__dirname, "src/foreground/index.tsx"),

    style: [
      resolve(__dirname, "src/assets/css/animate.css"),
      resolve(__dirname, "src/assets/css/toastr.min.css"),
      resolve(__dirname, "src/assets/css/main.css"),
    ],
  },

  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./dist/", //dont actually use these fonts but still need to process them
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({})]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.bundle.css",
    }),
    new HtmlWebpackPlugin({
      filename: "navBarPopup.html",
      template: "src/navBarPopup/index.html",
      chunks: ["navBarPopup"],
    }),
    new HtmlWebpackPlugin({
      filename: "optionsPage.html",
      template: "src/optionsPage/index.html",
      chunks: ["optionsPage"],
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/images/*.png", to: "[name].[ext]" },
        { from: "src/assets/fonts/*.otf", to: "[name].[ext]" },
        { from: "src/assets/fonts/*.woff", to: "[name].[ext]" },
      ],
    }),
  ],

  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200,
    poll: 500,
  },
};
