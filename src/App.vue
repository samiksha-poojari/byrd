<template>
  <v-app>
    <headerApp></headerApp>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import headerApp from './components/HeaderComponent';

export default {
  name: 'App',
  components: {
    headerApp
  },
};
</script>
