const MillionLint = require('@million/lint');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;
const _plugins = [new ModuleFederationPlugin({
  name: "webusageFE",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./WebUsageTable" :'./src/components/WebUsageTable/WebUsageTable.tsx',
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"]
    }
  }
}), new HtmlWebPackPlugin({
  template: "./src/index.html"
}), new Dotenv()];
_plugins.unshift(MillionLint.webpack())
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:8081/"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
  },
  devServer: {
    port: 8081,
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.m?js/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false
      }
    }, {
      test: /\.(css|s[ac]ss)$/i,
      use: ["style-loader", "css-loader", "postcss-loader"]
    }, {
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  },
  plugins: _plugins
});