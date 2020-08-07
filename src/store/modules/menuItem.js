import MenuItemService from '@/services/MenuItemService'

export const namespaced = true

export const state = {
  menuItems: [],
  menuItem: {}
}

export const mutations = {

  ADD_MENU_ITEM (state, menuItem) {
    state.menuItems.push(menuItem)
  },

  SET_MENU_ITEMS (state, menuItems) {
    state.menuItems = menuItems
  },

  SET_MENU_ITEM (state, menuItem) {
    state.menuItem = menuItem
  },

  UPDATE_MENU_ITEM (state, menuItemToUpdate) {
    state.menuItems = state.menuItems.filter(menuItem => menuItem.id !== menuItemToUpdate.id)
    state.menuItems.unshift(menuItemToUpdate)
  },

  DELETE_MENU_ITEM (state, menuItemToDeleteID) {
    state.menuItems = state.menuItems.filter(
      menuItem => menuItem.id !== menuItemToDeleteID
    )
  }

}

export const actions = {

  createMenuItem ({ commit, dispatch }, menuItem) {
    console.log('===menuItem', menuItem)
    MenuItemService.postMenuItem(menuItem).then((response) => {
      console.log('===menuItem', response)
      commit('ADD_MENU_ITEM', response.data)
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

  editMenuItem ({ commit, dispatch }, { menuItemId, menuItemDataToUpdate }) {
    MenuItemService.editMenuItem(menuItemId, menuItemDataToUpdate).then((response) => {
      commit('UPDATE_MENU_ITEM', response.data)
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

  fetchMenuItems ({ commit, dispatch }) {
    return MenuItemService.getMenuItems()
      .then((response) => {
        commit('SET_MENU_ITEMS', response.data.rows)
      }).catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },

  deleteMenuItem ({ commit, dispatch }, menuItemToDeleteID) {
    MenuItemService.deleteMenuItem(menuItemToDeleteID).then((response) => {
      commit('DELETE_MENU_ITEM', menuItemToDeleteID)
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
  },

  fetchMenuItemById ({ commit, getters }, id) {
    const menuItem = getters.getMenuItemId(id)
    if (menuItem) {
      commit('SET_MENU_ITEM', menuItem)
      return menuItem
    } else {
      return MenuItemService.getMenuItem(id)
        .then((response) => {
          commit('SET_MENU_ITEM', response.data)
          return response.data
        })
    }
  }

}

export const getters = {

  getMenuItemId: state => id => {
    return state.menuItems.find(menuItem => menuItem.id === id)
  }

}
