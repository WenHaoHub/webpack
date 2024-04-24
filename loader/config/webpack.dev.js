module.exports = {
  mode: "development",
  // devtool: 'none',
  devtool: "eval-cheap-module-source-map",
  devServer: {
    // compress: true, //启动GZip压缩
    // open: true,
    hot: true, //启用模块热替换HMR，在修改模块时不会重新加载整个页面，只会更新改变的内容
    // 配置代理,解决接口跨域问题
    proxy: {
      "/api": {
        // target: "https://test.cdgzjg.cn/", //成都国资委测试
        // target: "https://preview.cdgzjg.cn",//成都国资委测试
        target: "https://release.cdgzjg.cn/",//成都国资委测试
        // target: "https://www.cdgzjg.cn",//成都国资委生产
        // target: "https://www.scgzjg.cn",//省国资委
        secure: false, // 如果是https接口，需要配置这个参数 设置为false
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
    //   plugins: [new Webpack.HotModuleReplacementPlugin()],// hot: true自动配制了  不需要手动写
  },
};
