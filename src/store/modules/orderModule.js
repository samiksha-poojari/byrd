import serverProxy from "../../proxy/ServerProxy";

export const orderModule = {
         state: {
           customers: [],
           orders: [],
           dateRange: [],
           selectedCustomer: ""
         },
         mutations: {
           setCustomers: (state, param) => (state.customers = param),
           setOrders: (state, param) => (state.orders = param),
           setDateRange: (state, param) => (state.dateRange = param),
           setSelectedCustomer: (state, param) =>
             (state.selectedCustomer = param)
         },
         getters: {
           getCustomers: state => state.customers,
           getOrders: state => state.orders,
           getDateRange: state => state.dateRange,
           getSelectedCustomer: state => state.selectedCustomer
         },
         actions: {
           setSelectedCustomer({ commit }, param) {
             commit("setSelectedCustomer", param);
           },
           setDateRange({ commit }, iParam) {
             commit("setDateRange", iParam);
           },
           getCustomers({ commit }) {
             return new Promise((resolve, reject) => {
               new serverProxy()
                 .fetchData({
                   url: `http://private-anon-1f36deeff8-byrd1.apiary-mock.com/customers`,
                   method: `GET`,
                   headers: {
                     Accept: "application/json"
                   }
                 })
                 .then(response => {
                   if (response && response.data) {
                     resolve(response.data);
                     commit("setCustomers", response.data);
                     commit("setSelectedCustomer", response.data[0].name);
                   }
                 })
                 .catch(error => {
                   reject(error);
                 });
             });
           },
           getCustomersByJson({ commit }) {
             return new Promise((resolve, reject) => {
               new serverProxy()
                 .fetchData({
                   url: `${window.location.origin}/data/customers.json`,
                   method: `GET`,
                   headers: {
                     Accept: "application/json"
                   }
                 })
                 .then(response => {
                   if (response && response.data) {
                     resolve(response);
                     commit("setCustomers", response.data);
                   }
                 })
                 .catch(error => {
                   reject(error);
                 });
             });
           },
           getOrders({ commit, state }) {
             return new Promise((resolve, reject) => {
               new serverProxy()
                 .fetchData({
                   url: `http://private-anon-1f36deeff8-byrd1.apiary-mock.com/orders/${state.selectedCustomer}?${state.dateRange[0]}&${state.dateRange[1]}`,
                   method: `GET`,
                   headers: {
                     Accept: "application/json"
                   }
                 })
                 .then(response => {
                   if (response && response.data) {
                     resolve(response);
                     commit("setOrders", response.data);
                   }
                 })
                 .catch(error => {
                   reject(error);
                 });
             });
           }
         }
       };
