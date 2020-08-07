
import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user'
import * as event from '@/store/modules/event'
import * as notification from '@/store/modules/notification'
import * as category from '@/store/modules/category'
import * as menuItem from '@/store/modules/menuItem'
import * as menu from '@/store/modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    menu,
    menuItem,
    category,
    event,
    user,
    notification
  }
})
