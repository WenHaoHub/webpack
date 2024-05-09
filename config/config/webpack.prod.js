const path = require("path");
const pkg = require("../package.json");
let cachePath = path.resolve(__dirname, `../../cache/${pkg.name}/dist`);
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //自动删除之前打包的js
const CompressionPlugin = require("compression-webpack-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //打包后包分析
const CopyPlugin = require("copy-webpack-plugin"); //复制不需要打包的文件
//打包速度分析---------
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
//不需要分析打包速度就删除smp.wrap() 暴露配置对象
module.exports = smp.wrap({
  mode: "production",
  // devtool: "source-map",
  // devtool: "none",//none配置项已不能再用 关闭用false
  devtool: false,
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
    // new CompressionPlugin({
    //   // filename: '[path][base].gz', // 输出压缩文件的名称
    //   test: /\.(js|css|less)$/, // 匹配文件名
    //   algorithm: 'gzip', //采用的压缩算法
    //   threshold: 10240, // 对超过10k的数据压缩
    //   deleteOriginalAssets: false, // 不删除源文件
    //   minRatio: 0.8 // 压缩比 默认值0.8
    // })
    // new BundleAnalyzerPlugin(),
  ],
  cache: {
    type: "filesystem",
    cacheDirectory: cachePath,
  },
  
});
