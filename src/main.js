import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "./plugins/axios";
import { Lazyload } from "vant"; // 引用懒加载

Vue.config.productionTip = false;
Vue.use(Axios, Lazyload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
