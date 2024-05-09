import Vue from "vue";
import App from "./app";

import "./css/reset.css";
import "./css/isTree.css";
import router from "./router";

// import './plugin/element-ui'//ui按需引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//echarts按需引入
import "./plugin/echarts";
// import * as echarts from 'echarts';
// Vue.prototype.$echarts=echarts 

Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#root");
