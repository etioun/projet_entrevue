import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Regular Webpack:
import * as VueGoogleMaps from 'vue2-google-maps'
//// If you encounter issues with UglifyJS and Nuxt.js, try the following instead:
// import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'



Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA4wFMH8SBl2pA_-R4b55MPMBavZeSL7J8',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})


import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
