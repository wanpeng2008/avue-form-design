import Vue from 'vue'
import App from './App'
import router from './router'
import AvueFormDesign from '../packages/';
import AvueUeditor from 'avue-plugin-ueditor'
import AvueMap from 'avue-plugin-map'

Vue.use(window.AVUE)
Vue.use(AvueFormDesign)
Vue.use(AvueUeditor)
Vue.use(AvueMap)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')