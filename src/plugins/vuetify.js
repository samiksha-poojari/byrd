import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      dark: {
        primary: "#00BFA5"
      },
      light: {
        primary: "#26A69A",
        secondary: "#B2DFDB",
        third: "#64FFDA"
      }
    }
  }
});
