const fs = require('fs');
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

const version = fs.readFileSync(path.resolve(__dirname, './dist/build-tag'));

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "app2_tag_name",
      filename: `${version}/remoteEntry.js`,
      exposes: {
        "./main": "./src/index.ts",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
  },
  output: {
    publicPath: "auto",
    filename: `${version}/[name].js`
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-typescript"],
        },
      },
    ],
  },
};
