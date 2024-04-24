module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [[require("./src/try"),{
    customLog:"日志"
  }]],
};
