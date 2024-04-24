<template>
  <div>
    <h1>用loader转义vuej格式问题件</h1>
    <h2>
      vuej中的变量a
      <span>：{{ a }}</span>
    </h2>
    <h2>
      vuej中的变量b
      <span>：{{ b }}</span>
    </h2>
  </div>
</template>

<script>
//loader测试 导入特殊格式 利用loader转换格式 使js能使用
import value from "./webpack/vyej-type.vuej";
export default {
  data() {
    return {
      a: "",
      b: "",
    };
  },
  mounted() {
    console.log("vyej>>>", value); // { a: 10, b: 20 }
    this.a = value.a;
    this.b = value.b;
  },
};
</script>

<style></style>
