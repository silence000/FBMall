import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    IMAGES_SERVER_API_URL: "http://localhost:8898/fbmall-images/img",
    PRODUCT_SERVER_API_URL: "http://localhost:8898/fbmall-products",
    USERS_SERVER_API_URL: "http://localhost:8898/fbmall-users",
    ORDER_SERVER_API_URL: "http://localhost:8898/fbmall-orders"
  },
  mutations: {},
  actions: {},
  modules: {}
});
