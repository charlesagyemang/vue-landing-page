import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";

import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import CreateCategory from './views/Dashboard/Category/CreateCategory.vue'
import CreateMenuItem from './views/Dashboard/MenuItem/CreateMenuItem.vue'
import CreateMenu from './views/Dashboard/Menu/CreateMenu.vue'
import CreateEvent from './views/Dashboard/Event/CreateEvent.vue'
import CreateResponse from './views/Dashboard/Response/CreateResponse.vue'
import ListCategories from './views/Dashboard/Category/ListCategories.vue'
import ListMenuItems from './views/Dashboard/MenuItem/ListMenuItems.vue'
import ListMenus from './views/Dashboard/Menu/ListMenus.vue'
import ListEvents from './views/Dashboard/Event/ListEvents.vue'
import GetLiveResponseUpdate from './views/Dashboard/Response/GetLiveResponseUpdate.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    // DASHBOARD ITEMS STARTS HERS
    {
      path: '/dashboard/create-category',
      name: 'create-category',
      components: {
        header: AppHeader,
        default: CreateCategory,
        footer: AppFooter
      },
    },

    {
      path: '/dashboard/list-categories',
      name: 'list-categories',
      components: {
        header: AppHeader,
        default: ListCategories,
        footer: AppFooter
      },
    },

    {
      path: '/dashboard/create-menu-item',
      name: 'create-menu-item',
      components: {
        header: AppHeader,
        default: CreateMenuItem,
        footer: AppFooter
      },
    },

    {
      path: '/dashboard/list-menu-items',
      name: 'list-menu-items',
      component: ListMenuItems
    },

    {
      path: '/dashboard/create-menu',
      name: 'create-menu',
      component: CreateMenu
    },

    {
      path: '/dashboard/list-menus',
      name: 'list-menus',
      component: ListMenus
    },

    {
      path: '/dashboard/create-event',
      name: 'create-event',
      component: CreateEvent
    },

    {
      path: '/dashboard/list-event',
      name: 'list-event',
      component: ListEvents
    },

    {
      path: '/dashboard/create-response/:id',
      name: 'create-response',
      component: CreateResponse,
      params: true
    },
    {
      path: '/dashboard/get-live-response-page/:id',
      name: 'live-responses',
      component: GetLiveResponseUpdate,
      params: true
    },

    // DASHBOARD ITEMS END HERE

    // NOT FOUUND
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'Page' }}
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
