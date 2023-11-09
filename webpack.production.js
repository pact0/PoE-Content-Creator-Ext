const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
  const browser = env.browser || "chrome";
  return {
    ...merge(base, {
      mode: "production",
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: { ascii_only: true },
            },
          }),
        ],
      },
      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            { from: `manifest-${browser}.json`, to: "manifest.[ext]" },
          ],
        }),
      ],
    }),
  };
};
