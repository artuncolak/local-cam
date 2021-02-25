const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

rules.push({
  test: /\.(scss|css)$/,
  use: ["style-loader", "css-loader", "sass-loader"],
});

rules.push({
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: "file-loader",
      options: {
        publicPath: "..",
        context: "src",
      },
    },
  ],
});

rules.push({
  test: /\.(jpg|png|svg|ico|icns)$/,
  loader: "file-loader",
  options: {
    publicPath: "..",
    context: "src",
  },
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
