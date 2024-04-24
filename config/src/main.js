import Vue from "vue";
import App from "./app";

import "./css/reset.css";
import "./css/isTree.css";

import './plugin/element-ui'//ui按需引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//echarts按需引入
import "./plugin/echarts";
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
}).$mount("#root");
