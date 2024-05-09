const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //在html中自动引入打包后的js
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css从js中分离为单独的css文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge"); //合并
const pkg = require("../package.json");
let cachePath = path.resolve(__dirname, `../../cache/${pkg.name}/babel-loader`);

// const consoleLoader = require("../src/webpack/console-loader");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
// console.log(">>>process.env.NODE_ENV", process.env.NODE_ENV);
// const Webpack = require('webpack')//webpack服务器 热更新 类似live serve
// module.exports = {
module.exports = function (env) {
  // env=="dev": "webpack-dev-server --config config/webpack.config.js 这里配置的>>>>--env production<<<<"
  const isPorduction = env.production === true;
  const isDevlopment = env.devlopment === true;
  const config = isPorduction ? prodConfig : devConfig;
  // console.log(">>>env", isDevlopment);

  return merge(config, {
    // 在Node.js中，__dirname 总是指向 被执行的js文件 的绝对路径
    entry: path.resolve(__dirname, "../src/main.js"), //入口文件
    output: {
      filename: "[name].[chunkhash:6].js", //打包后的名字  生成8位数的hash
      path: path.resolve(__dirname, "../dist"), //打包的路径
    },
    //路径相关 配置别名和扩展名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
      extensions: [".js", ".vue", ".json"], //无文件后缀的时候自动补全
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isPorduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
            "css-loader",
          ],
        },
        // { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
        {
          test: /\.less$/,
          use: [
            isPorduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
            "css-loader",
            "less-loader",
          ],
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: cachePath, //开启缓存
              },
            },
          ],
          exclude: ["/node_modules/"],
        },
        { test: /\.vue$/, use: ["vue-loader"] },
        {
          test: /\.(png|jpg|gif|jpeg|webp|svg|eot)$/,
          type: "asset", //根据文件大小决定是输出 data URL 还是发送单独文件
          generator: {
            filename: "asset/image/[name].[contenthash:8][ext][query]",
          },
        },
        {
          test: /\.(ttf|woff|woff2)$/,
          type: "asset",
          generator: {
            filename: "asset/font/[name].[contenthash:8][ext][query]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        // template:'public/index.html'
        template: path.resolve(__dirname, "../public/index.html"),
      }),
      //静态资源输出到根目录

      new VueLoaderPlugin(),
      //从js中抽离css
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:6].css",
        // filename: "css/[name].[chunkhash:6].css",
      }),
      new CssMinimizerPlugin(), //压缩 css
      // new Webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          elementUI: {
            priority: 20,
            name: "element-ui",
            test: /element-ui/,
            reuseExistingChunk: true,
          },
          echarts: {
            priority: 20,
            name: "echarts",
            test: /echarts/,
            reuseExistingChunk: true,
          },
          vendor: {
            // name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/, //控制此缓存组选择的模块。省略它将选择所有模块。它可以匹配绝对模块资源路径或块名称。匹配块名称时，将选择块中的所有模块。
            minChunks: 1,
            // maxInitialRequests: 12,
            maxAsyncRequests: 5,
            minSize: 100 * 1024,
            maxSize: 5 * 1000 * 1024,
            priority: -10, //一个模块可以属于多个缓存组,模块出现在优先级最高的缓存组中
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true, //如果当前块包含已经从主包中分离出来的模块，那么该模块将被重用，而不是生成新的模块
          },
        },
      },
    },
  });
  // return mergeConfig;
};
