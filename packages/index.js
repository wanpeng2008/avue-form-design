import Config from './config'
// import FormDesign from './index.vue'
import FormDesign from './FormDesign.vue'
import OverlayDesign from './OverlayDesign.vue'
export default {
  install(Vue) {
    Vue.use(Config)
    Vue.component('Avue' + FormDesign.name, FormDesign);
    Vue.component('Avue' + OverlayDesign.name, OverlayDesign);
  }
}