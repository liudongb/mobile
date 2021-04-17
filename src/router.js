import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      meta: {
        title: "首页"
      },
      component: () => import("@/views/Home")
    }
  ]
});
