这是一个基于webpack搭建的vue工程化项目

## vue 2.x版本 
## vue-loader 只能使用@14/@15版本

@babel/core
babel-loader仅仅识别出了jsx文件，内部核心转译功能需要@babel/core这个核心库，
@babel/core模块就是负责内部核心转译实现的
plugin-transform-runtime 转换高版本内置模块 Promise, Set and Map

mini-css-extract-plugin 把打包后的css从js里抽离css到单独目录
css-minimizer-webpack-plugin 压缩css代码

webpack-merge 合并 Webpack 配置

babel-plugin-components element ui按需加载


webpack-bundle-analyzer 可以查看打包后各个文件的占比，来针对性的优化。

cross-env 设置环境变量

"build": "cross-env NODE_ENV=production webpack --config config/webpack.prd.js --progress",
  ==设置环境变量为生产模式 启动webpack打包 使用config文件夹下webpack.prd.js配置打包 --progress是打包后打开刚刚打好的包大小分析

表格用到的jsx语法 需要安装bable插件
yarn add @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props