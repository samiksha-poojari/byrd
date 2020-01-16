<template>
<div>
    
  <v-card class="cardClass">

    <v-app-bar light color="secondary">
      <v-tooltip  top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
      <v-icon @click="backToMain" style="marginRight:20px">mdi-keyboard-backspace</v-icon>
            </v-btn>
          </template>
          <span>Back to Main</span>
        </v-tooltip>

      Date Range : {{dateRange[0]}} ~ {{dateRange[1]}}
      <strong>({{totalDays}} Days)</strong>
      <v-spacer></v-spacer>Total amount of invoice :
      <strong>{{totalAmount.total}} {{totalAmount.currency}}</strong>
      <v-spacer></v-spacer>Number of Orders :
      <strong>{{orders.length}}</strong>
    </v-app-bar>

    <br />
    <v-data-table
      :headers="headers"
      :items="orders"
      :single-expand="true"
      item-key="id"
      show-expand
      class="elevation-1"
    >
      <template v-slot:item.created_at="{ item }">{{ formatDate(item.created_at) }}</template>
      <template v-slot:item.total_amount="{ item }">{{ getTotalPrice(item.items) }}</template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="7">
          <v-container>
            <thead>
              <tr>
                <th class="someClass">Id</th>
                <th class="someClass">Name</th>
                <th class="someClass">Quantity</th>
                <th class="someClass">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in item.items" :key="item.name">
                <td class="someClass">{{ item.id }}</td>
                <td class="someClass">{{ item.name }}</td>
                <td class="someClass">{{item.quantity}}</td>
                <td
                  class="someClass"
                >{{ getItemPrice(item)}}</td>
              </tr>
            </tbody>
          </v-container>
        </td>
      </template>
    </v-data-table>
  </v-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    expanded: [],
    headers: [
      {
        text: "Order ID",
        align: "left",
        sortable: false,
        value: "id"
      },
      { text: "Recipient Name", value: "recipient.name" },
      { text: "Recipient Email", value: "recipient.email" },
      { text: "Date", value: "created_at" },
      { text: "Total amount", value: "total_amount" },
      { text: "Delivery Partner", value: "delivery.courier" },
      { text: "Delivery Method", value: "delivery.method" },
      { text: "Items", value: "data-table-expand" }
    ]
  }),
  methods: {
    backToMain(){
      this.$router.push("/")
    },
    getTotalPrice(data) {
      var total = data.reduce(function(a, b) {
        return Number(a) + (Number(b.total_price.amount) * b.quantity);
      }, 0);
      return total.toFixed(2);
    },
    formatDate(iDate){
      return moment(String(iDate)).format("DD-MM-YYYY");
    },
    getItemPrice(data){
      return `${(data.total_price.amount * data.quantity).toFixed(2)} ${data.total_price.currency}`;
    }
  },
  computed: {
    orders() {
      return this.$store.getters.getOrders;
    },
    dateRange() {
      return this.$store.getters.getDateRange;
    },
    totalDays() {
      let t1 = new Date(this.$store.getters.getDateRange[0]);
      let t2 = new Date(this.$store.getters.getDateRange[1]);
      let diff = t2.getTime() - t1.getTime();
      return diff / (1000 * 3600 * 24);
    },
    totalAmount() {
      let currency = "";
      let total = this.$store.getters.getOrders.reduce((a, b) => {
        currency = b.charge_customer.currency;
        return Number(a) + Number(b.charge_customer.total_price);
      }, 0);
      return { total: total.toFixed(2), currency };
    }
  }
};
</script>

<style scoped>
.cardClass {
  margin: 40px;
  width: auto;
}
.someClass {
  width: 400px;
}
</style>