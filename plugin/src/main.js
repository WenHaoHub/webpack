import Vue from "vue";
import App from "./app";
//loader测试
// import value from "./utils/vyej-type.vuej";
// console.log(value); // { a: 10, b: 20 }

new Vue({
  render: (h) => h(App),
}).$mount("#root");
