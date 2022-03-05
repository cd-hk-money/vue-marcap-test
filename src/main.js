import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'
import vuetify from './plugins/vuetify'
import { createPinia, PiniaVuePlugin } from 'pinia'
import { useChartStore } from './store/chart_pinia'
import { useContentStore } from './store/content_pinia'

Vue.use(VueCompositionApi)
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  pinia,
  vuetify,
}).$mount('#app')

const chartStore = useChartStore()
const contentStore = useContentStore()
console.log(chartStore, contentStore)
