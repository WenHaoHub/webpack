const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //自动删除之前打包的js
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //打包后包分析
const CopyPlugin = require("copy-webpack-plugin"); //复制不需要打包的文件

module.exports = {
  mode: "production",
  devtool: "source-map",
  // devtool:'none',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"), //放到output文件夹下
          globOptions: {
            dot: true,
            gitignore: false,
            ignore: [
              // 配置不用copy的文件
              "**/index.html",
            ],
          },
        },
      ],
    }),

    // new BundleAnalyzerPlugin(),
  ],
};
