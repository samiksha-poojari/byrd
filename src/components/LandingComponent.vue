<template>
  <v-container class="fill-height" fluid>
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title>byrd form </v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-col class="d-flex" cols="12" sm="12">
            <v-select :items="customers" item-text="name" label="Select customer" v-model="selectedCustomer" dense outlined></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date range"
                  v-on="on"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker v-model="dates" range scrollable color="primary">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider ></v-divider>
      <v-card-actions>
         <v-spacer></v-spacer>
        <v-btn color="primary" text @click="fetchOrders">Submit</v-btn>
        <v-spacer></v-spacer>
       </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
      menu: false,
    };
  },
  created() {
    this.dates = (this.getDate && this.getDate.length>0) ? this.getDate : [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
    this.getCustomers();
  },
  methods: {
    getCustomers() {
      if(this.customers && this.customers.length == 0){
        this.$store.dispatch("getCustomers")
      }
    },
    fetchOrders() {
      this.$store.dispatch("getOrders",{date : this.dates, selectedCustomer : this.selectedCustomer});
      this.$store.dispatch("setDateRange",this.dates)
      this.$router.push('/orders')
    }
  },
  computed: {
    customers() {
      return this.$store.getters.getCustomers;
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    getDate(){
      return this.$store.getters.getDateRange;
    },
    selectedCustomer:{
      get(){
        return this.$store.getters.getSelectedCustomer;
      },
      set(newValue){
        this.$store.dispatch("setSelectedCustomer",newValue)
      }
    }
  }
};
</script>