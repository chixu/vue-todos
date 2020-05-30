import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

// const opts = {}

export default new Vuetify({
  customProperties: true,
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  // icons: {
  //   iconfont: 'mdi', // default - only for display purposes
  // },
  theme: {
    themes: {
      light: {
        primary: '#4CAF50',
      },
    },
  },
})