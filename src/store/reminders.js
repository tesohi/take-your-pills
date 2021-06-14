import firebase from 'firebase/app'

export default {
  state: {
    reminders: null
  },
  mutations: {
    setReminders(state, reminders) {
      state.reminders = reminders
    }
  },
  actions: {
    async fetchReminders({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid') 
        const remindersObj = (await firebase.database().ref(`/users/${uid}/reminders`).once('value')).val()
        const remindersArr = []

        for (let reminderId in remindersObj) {
          remindersArr.unshift(remindersObj[reminderId])
        }

        commit('setReminders', remindersArr)
        return remindersArr
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async addReminder({dispatch, commit}, reminder){
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/reminders/${reminder.id}`).set({
          id: reminder.id,
          title: reminder.title,
          dateOfStart: reminder.dateOfStart,
          amountDays: reminder.amountDays,
          timesPerDay: reminder.timesPerDay,
          remindersTime: reminder.remindersTime
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async deleteReminder({dispatch, commit}, reminderId) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/reminders/${reminderId}`).remove() 
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    reminders: s => s.reminders
  }
}