import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/user/login")
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/main")
  },
  {
    path: "/sort",
    name: "List",
    component: () => import("../views/list")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/cart")
  },
  {
    path: "/goods",
    name: "Goods",
    component: () => import("../views/goods")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/user")
  },
  {
    path: "/edit/address",
    name: "editAddress",
    component: () => import("../views/cart/editAddress")
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/orders")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
