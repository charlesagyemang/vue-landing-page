import CategoryService from '@/services/CategoryService'

export const namespaced = true

export const state = {
  categories: [],
  category: {}
}

export const mutations = {

  ADD_CATEGORY (state, category) {
    console.log('===set categiory', category)
    state.categories.push(category)
  },

  SET_CATEGORIES (state, categories) {
    state.categories = categories
  },

  SET_CATEGORY (state, category) {
    state.category = category
  },

  UPDATE_CATEGORY (state, categoryToUpdate) {
    state.categories = state.categories.filter(category => category.id !== categoryToUpdate.id)
    state.categories.unshift(categoryToUpdate)
  },

  DELETE_CATEGORY (state, categoryIdToDelete) {
    state.categories = state.categories.filter(
      category => category.id !== categoryIdToDelete
    )
  }

}

export const actions = {

  createCategory ({ commit, dispatch }, category) {
    console.log('===category', category)
    CategoryService.postCategory(category).then((response) => {
      console.log('===category', response)
      commit('ADD_CATEGORY', response.data)
      const notification = {
        type: 'success',
        message: 'Your Event has Been Created!'
      }
      dispatch('notification/add', notification, { root: true })
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem creating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  },

  fetchCategories ({ commit, dispatch }) {
    return CategoryService.getCategories()
      .then((response) => {
        commit('SET_CATEGORIES', response.data.rows)
      }).catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },

  fetchCategoryById ({ commit, getters }, id) {
    const category = getters.getCategoryById(id)

    if (category) {
      commit('SET_CATEGORY', category)
      return category
    } else {
      return CategoryService.getCategory(id)
        .then((response) => {
          commit('SET_CATEGORY', response.data)
          return response.data
        })
    }
  },

  editCategory ({ commit, dispatch }, { categoryId, categoryDataToUpdate }) {
    CategoryService.editCategory(categoryId, categoryDataToUpdate).then((response) => {
      commit('UPDATE_CATEGORY', response.data)
      const notification = {
        type: 'success',
        message: 'Your Category has Been Updated!'
      }
      dispatch('notification/add', notification, { root: true })
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem updating your category: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  },

  deleteCategory ({ commit, dispatch }, categoryIdToDelete) {
    CategoryService.deleteCategory(categoryIdToDelete).then((response) => {
      commit('DELETE_CATEGORY', categoryIdToDelete)
      const notification = {
        type: 'success',
        message: 'Your Category has Been Deleted!'
      }
      dispatch('notification/add', notification, { root: true })
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem updating your category: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  }

}

export const getters = {

  getCategoryById: state => id => {
    return state.categories.find(category => category.id === id)
  }

}
