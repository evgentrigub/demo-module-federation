const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const path = require("path");

const getRemoteModules = require('./mf-remotes');

/**
 * Remote modules array.
 */
const remoteModules = [
  { 
    tag:'app2-tag-name', 
    url:'https://localhost:4002' 
  },
]

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: getRemoteModules(remoteModules)
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
    port: 3001,
  },
  output: {
    publicPath: "auto",
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
  }
};
