import Vue from "vue";
import App from "./App.vue";

//导包
/* eslint-disable */
import VueRouter from "vue-router";
import axios from "axios";
//引入组件
import Results from "./components/results.vue";
import Player from "./components/player.vue";
import Video from "./components/video.vue";
import Comment from "./components/comment.vue";

Vue.config.productionTip = false;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//把$axios属性设置给Vue原型
Vue.prototype.$axios = axios;
//设置基地址
axios.defaults.baseURL = "https://autumnfish.cn";

//用包
Vue.use(VueRouter);

//路由规则数组
const routes = [
  {
    path: "/results/:keywords",
    component: Results
  },
  {
    path: "/player/:id",
    component: Player
  },
  {
    path: "/video",
    component: Video
  },
  {
    path: "/comment",
    component: Comment
  }
];

//实例化VueRouter
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
  linkActiveClass: "active"
});

// 实例化Vue的时候，把router传递
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
