const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //在html中自动引入打包后的js
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css从js中分离为单独的css文件
const { merge } = require("webpack-merge"); //合并

const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
//plugin测试
const MyExamplePlugin = require("../src/webpack/MyExamplePlugin.js");
const BannerWebpackPlugin  = require("../src/webpack/BannerWebpackPlugin .js");
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
          test: /\.js$/,
          use: ["babel-loader"],
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

      // 使用插件并可选地传入选项
      // new MyExamplePlugin({ option: true }),
      new BannerWebpackPlugin({ name: 'wh给你头部的注释' }),

      // new Webpack.HotModuleReplacementPlugin(),
    ],
  });
  // return mergeConfig;
};
