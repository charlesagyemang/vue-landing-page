import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  event: {}
}

export const mutations = {

  ADD_EVENT (state, event) {
    state.events.push(event)
  },

  SET_EVENTS (state, events) {
    state.events = events
  },

  SET_EVENT (state, event) {
    state.event = event
  },

  UPDATE_EVENT (state, eventToUpdate) {
    // remove
    state.events = state.events.filter(
      event => event.id !== eventToUpdate.id
    )
    // now push
    state.events.unshift(eventToUpdate)
  },

  DELETE_EVENT (state, eventToDeleteID) {
    state.events = state.events.filter(
      event => event.id !== eventToDeleteID
    )
  }

}

export const actions = {

  createEvent ({ commit, dispatch }, event) {
    EventService.postEvent(event).then((response) => {
      commit('ADD_EVENT', response.data)
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

  createResponse ({ commit, dispatch }, responseToCreate) {
    EventService.postResponse(responseToCreate).then((response) => {
      console.log('===Response====', response.data)
      console.log('===Updating Event====', response.data)
      commit('UPDATE_EVENT', response.data)
      console.log('===Setting Event====', response.data)
      commit('SET_EVENT', response.data)
      const notification = {
        type: 'success',
        message: 'Your Response has Been Created!'
      }
      dispatch('notification/add', notification, { root: true })
    }).catch((error) => {
      const notification = {
        type: 'error',
        message: 'There was a problem creating your response: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  },

  editEvent ({ commit, dispatch }, { eventId, eventDataToUpdate }) {
    EventService.editEvent(eventId, eventDataToUpdate).then((response) => {
      commit('UPDATE_EVENT', response.data)
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

  deleteEvent ({ commit, dispatch }, eventToDeleteID) {
    EventService.deleteEvent(eventToDeleteID).then((response) => {
      commit('DELETE_EVENT', eventToDeleteID)
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

  fetchEvents ({ commit, dispatch }) {
    return EventService.getEvents()
      .then((response) => {
        commit('SET_EVENTS', response.data.rows)
      }).catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },

  fetchEventById ({ commit, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data)
          return response.data
        })
    }
  },

  fetchEventByIdFresh ({ commit, getters }, id) {
    EventService.getEvent(id)
      .then((response) => {
        console.log('===res data gotten===', response.data)
        commit('SET_EVENT', response.data)
        return response.data
      })
  }

}

export const getters = {

  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }

}
