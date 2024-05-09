import Vue from "vue";
import Router from "vue-router";
// import about from "../views/about.vue";
Vue.use(Router);

export const constantRoutes = [
  // {
  //   path: "/",
  //   redirect: "/index",
  // },
  {
    path: "/index",
    component: () => import(/* webpackChunkName: "home"*/ "@/views/index"),
    // component: (resolve) => require(["@/views/index"], resolve),
    name: "首页",
    // meta: { title: "首页", icon: "homePage",}
    // meta: { title: "首页", icon: "homePage", noCache: true, affix: true },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about"*/ "../views/about.vue"),
    // component:views
  },
];

export default new Router({
  routes: constantRoutes,
});
