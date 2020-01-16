<template>
  <div>
    <v-card class="cardClass">
      <v-app-bar light color="secondary">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon @click="backToMain" style="marginRight:20px">mdi-keyboard-backspace</v-icon>
            </v-btn>
          </template>
          <span>Back to Main</span>
        </v-tooltip>
        Date Range : {{dateRange[0]}} ~ {{dateRange[1]}}
        <strong
          style="marginLeft:10px"
        >({{totalDays}} Days)</strong>
        <v-spacer></v-spacer>Total amount of invoice :
        <strong
          style="marginLeft:5px"
        >{{totalAmount.total}} {{totalAmount.currency}}</strong>
        <v-spacer></v-spacer>No. of Orders :
        <strong style="marginLeft:5px">{{orders.length}}</strong>
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
        <template v-slot:header.id="{ header }">
          <strong class="headerClass">{{header.text }}</strong>
        </template>
        <template v-slot:header.recipient.name="{ header }">
          <strong class="headerClass">{{ header.text }}</strong>
        </template>
        <template v-slot:header.recipient.email="{ header }">
          <strong class="headerClass">{{ header.text }}</strong>
        </template>
        <template v-slot:header.created_at="{ header }">
          <strong class="headerClass">{{ header.text }}</strong>
        </template>
        <template v-slot:header.total_amount="{ header }">
          <strong class="headerClass">{{ header.text }}</strong>
        </template>
        <template v-slot:header.delivery.courier="{ header }">
          <strong class="headerClass">{{ header.text }}</strong>
        </template>
        <template v-slot:header.delivery.method="{ header }">
          <strong class="headerClass">{{ header.text }}</strong>
        </template>
        <template v-slot:header.data-table-expand="{ header }">
          <strong class="headerClass">{{ header.text }}</strong>
        </template>
        <template v-slot:item.created_at="{ item }">{{ formatDate(item.created_at) }}</template>
        <template v-slot:item.total_amount="{ item }">{{ getTotalPrice(item.items) }}</template>
        <template v-slot:expanded-item="{ item }">
          <td :colspan="7">
            <v-container>
              <thead>
                <tr>
                  <th class="innerClass">Id</th>
                  <th class="innerClass">Name</th>
                  <th class="innerClass">Quantity</th>
                  <th class="innerClass">Unit Price</th>
                  <th class="innerClass">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in item.items" :key="item.name">
                  <td class="innerClass">{{ item.id }}</td>
                  <td class="innerClass">{{ item.name }}</td>
                  <td class="innerClass">{{item.quantity}}</td>
                  <td class="innerClass">{{item.total_price.amount}}</td>
                  <td class="innerClass">{{ getItemPrice(item)}}</td>
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
      { text: "Order ID", value: "id" },
      { text: "Recipient Name", value: "recipient.name" },
      { text: "Recipient Email", value: "recipient.email" },
      { text: "Date", value: "created_at" },
      { text: "Total Amount", value: "total_amount" },
      { text: "Delivery Partner", value: "delivery.courier" },
      { text: "Delivery Method", value: "delivery.method" },
      { text: "Items", value: "data-table-expand" }
    ]
  }),
  methods: {
    backToMain() {
      this.$router.push("/");
    },
    getTotalPrice(data) {
      let currency = "";
      var total = data.reduce(function(a, b) {
        currency = b.total_price.currency;
        return Number(a) + Number(b.total_price.amount) * b.quantity;
      }, 0);
      return `${total.toFixed(2)}  ${currency}`;
    },
    formatDate(iDate) {
      return moment(String(iDate)).format("DD-MM-YYYY");
    },
    getItemPrice(data) {
      return `${(data.total_price.amount * data.quantity).toFixed(2)} ${
        data.total_price.currency
      }`;
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
.innerClass {
  width: 400px;
  font-size: small;
}

.headerClass {
  font-size: initial;
}
</style>