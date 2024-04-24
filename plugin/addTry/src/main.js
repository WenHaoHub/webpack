import Vue from "vue";
import App from "./App.vue";
import './a';

Vue.config.productionTip = false;
// window.addEventListener('unhandledrejection', function (event) {
//   console.warn('全局请求异常捕获',event.reason);
//   console.log('>>>event',event.promise);
//   // 处理事件对象
//   // event.reason //获取到catch的err的原因(内容) 与控制台报错一致
//   // event.promise //获取到未处理的promise对象
//   // .....
//   });
new Vue({
  render: (h) => h(App),
}).$mount("#app");
