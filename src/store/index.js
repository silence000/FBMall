import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    IMAGES_SERVER_API_URL: "http://192.168.0.105:8890/img",
    PRODUCT_SERVER_API_URL: "http://192.168.0.105:8891",
    USERS_SERVER_API_URL: "http://192.168.0.105:8892",
    ORDER_SERVER_API_URL: "http://192.168.0.105:8893"
  },
  mutations: {},
  actions: {},
  modules: {}
});
