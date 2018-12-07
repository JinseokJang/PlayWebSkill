const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlguin = require("mini-css-extract-plugin");

module.exports = {
    module: {
      rules: [
        // loder 등록 (js,html,css....)
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: { minimize: true }
              }
            ]
        },
        {
            test:/\.css$/,
            use:[MiniCssExtractPlguin.loader,"css-loader"]
        }
      ]
    },
    plugins: [
      // plugin 
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new MiniCssExtractPlguin({
          filename:"[name].css",
          chunkFilename:"[id].css"
        })
    ]
  };