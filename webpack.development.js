const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const browser = env.browser || "chrome";
  return {
    ...merge(base, {
      mode: "development",
      devtool: "inline-source-map",
      watch: true,
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
