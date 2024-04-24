// MyExamplePlugin.js
class MyExamplePlugin {
  // 构造函数可以用来提供插件的配置
  constructor(options) {
    // 保存选项到插件实例
    this.options = options;
  }

  // apply方法是必须的，它会被Webpack compiler调用
  // compiler对象提供了对Webpack整个编译周期的访问
  apply(compiler) {
    // 可以通过钩子订阅事件，例如'emit'事件在输出文件到output目录之前触发
    compiler.hooks.emit.tap("MyExamplePlugin", (compilation, callback) => {
    //   console.log("This is an example plugin!");

    //   // 你可以访问compilation对象来处理文件等
    //   console.log(" this.options", this.options);
    //   console.log(compilation.assets);

      // 务必在结束时调用callback
      callback();
    });
  }
}

// 导出插件
module.exports = MyExamplePlugin;
