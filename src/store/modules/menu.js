import MenuService from '@/services/MenuService'

export const namespaced = true

export const state = {
  menus: [],
  menu: {}
}

export const mutations = {

  ADD_MENU (state, menu) {
    state.menus.push(menu)
  },

  SET_MENUS (state, menus) {
    state.menus = menus
  },

  SET_MENU (state, menu) {
    state.menu = menu
  },

  UPDATE_MENU (state, menuToUpdate) {
    state.menus = state.menus.filter(menu => menu.id !== menuToUpdate.id)
    state.menus.unshift(menuToUpdate)
  },

  DELETE_MENU (state, menuIdToDelete) {
    state.menus = state.menus.filter(
      menu => menu.id !== menuIdToDelete
    )
  }

}

export const actions = {

  createMenu ({ commit, dispatch }, menu) {
    console.log('===menu', menu)
    MenuService.postMenu(menu).then((response) => {
      console.log('===menu', response)
      commit('ADD_MENU', response.data)
      const notification = {
        type: 'success',
        message: 'Your Menu Item has Been Created!'
      }
      dispatch('notification/add', notification, { root: true })
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem creating your menu item: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  },

  fetchMenus ({ commit, dispatch }) {
    return MenuService.getMenus()
      .then((response) => {
        commit('SET_MENUS', response.data.rows)
      }).catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },

  editMenu ({ commit, dispatch }, { menuId, menuDataToUpdate }) {
    MenuService.editMenu(menuId, menuDataToUpdate).then((response) => {
      commit('UPDATE_MENU', response.data)
      const notification = {
        type: 'success',
        message: 'Your Event has Been Updated!'
      }
      dispatch('notification/add', notification, { root: true })
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem updating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  },

  fetchMenuById ({ commit, getters }, id) {
    const menu = getters.getMenuById(id)
    if (menu) {
      commit('SET_MENU', menu)
      return menu
    } else {
      return MenuService.getMenu(id)
        .then((response) => {
          commit('SET_MENU', response.data)
          return response.data
        })
    }
  },

  deleteMenu ({ commit, dispatch }, menuIdToDelete) {
    MenuService.deleteMenu(menuIdToDelete).then((response) => {
      commit('DELETE_MENU', menuIdToDelete)
      const notification = {
        type: 'success',
        message: 'Your Event has Been Deleted!'
      }
      dispatch('notification/add', notification, { root: true })
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem updating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  }

}

export const getters = {

  getMenuById: state => id => {
    return state.menus.find(menu => menu.id === id)
  }

}
