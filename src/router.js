import LandingComponent from "./components/LandingComponent.vue"
import OrderComponent from "./components/OrdersComponent.vue"

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      component: LandingComponent
    },
    {
      path: "/orders",
      component: OrderComponent
    }
  ]
});
