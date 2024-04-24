<template>
  <h1>test</h1>
</template>

<script>
//loader测试 导入特殊格式 利用loader转换格式 使js能使用
import value from "./utils/vyej-type.vuej";
export default {
  mounted() {
    console.log("vyej>>>", value); // { a: 10, b: 20 }
  },
};
</script>

<style></style>
