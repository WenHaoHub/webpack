const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //在html中自动引入打包后的js
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css从js中分离为单独的css文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge"); //合并

// const consoleLoader = require("../src/webpack/console-loader");
const vuejLoader = path.resolve(__dirname, "../src/webpack/vuej-loader"); // 指定自定义loader的位置
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
      filename: "[name].[hash:8].js", //打包后的名字  生成8位数的hash
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
          use: ["babel-loader"],
          exclude: ["/node_modules/"],
        },
        {
          test: /\.vuej$/,
          use: [
            {
              loader: vuejLoader, // 这里填写你的loader文件的路径
              options: {
                env: "dev",
              }, // 如果你的loader需要配置参数，可以添加在这里
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
        filename: "css/[name].[fullhash:6].css",
      }),
      new CssMinimizerPlugin(), //压缩 css
      // new Webpack.HotModuleReplacementPlugin(),
    ],
  });
  // return mergeConfig;
};
