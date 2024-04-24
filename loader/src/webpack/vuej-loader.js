// 解析vuej文件格式 抽离

const REG = /<script>([\s\S+]+?)<\/script>/;

module.exports = function (source) {
  //如果匹配成功，[0]将包含整个匹配的文本（包括<script>和</script>标签），
  //[1]将包含第一个捕获组的内容，也就是<script>和</script>之间的文本。
  const __source = source.match(REG);

  console.log(">>>__source", this.query, __source[1]);

  return __source && __source[1] ? __source[1] : source;
};
