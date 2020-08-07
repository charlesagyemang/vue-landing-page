import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/store'
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import { dateFiler, filterItems } from './filters/utilityFilter'
import 'nprogress/nprogress.css'
import Multiselect from 'vue-multiselect'


// register globally
const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})


Vue.config.productionTip = false;
Vue.filter('date', dateFiler)
Vue.use(BootstrapVue)
Vue.filter('filterItems', filterItems)
Vue.component('multiselect', Multiselect)

window.bus = new Vue()
Vue.use(Argon);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
