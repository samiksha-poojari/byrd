import Vue from "vue";
import Vuex from "vuex";
import { orderModule } from "../store/modules/orderModule";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    orderModule
  },
  plugins: [createPersistedState()]
});

export default store;
