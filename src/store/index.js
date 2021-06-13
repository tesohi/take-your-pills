import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import notes from './notes'
import recommendations from './recommendations'
import reminders from './reminders'
import medInfo from './medInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
    
  },
  modules: {
    auth,
    info,
    notes,
    recommendations,
    reminders,
    medInfo
  }
})
