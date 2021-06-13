import firebase from 'firebase/app'

export default {
  state: {
    medInfo: {}
  },
  mutations: {
    setMedInfo(state, medInfo) {
      state.medInfo = medInfo
    }
  },
  actions: {
    async fetchMedInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid') 
        const infoObj = (await firebase.database().ref(`/users/${uid}/medInfo`).once('value')).val()
        const infoArr = []

        for (let key in infoObj) {
          infoArr.unshift({...infoObj[key], id: key})
        }

        commit('setMedInfo', infoArr)
        return infoArr
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addMedInfo({dispatch, commit}, info) {
      try {
        const uid = await dispatch('getUid') 
        await firebase.database().ref(`/users/${uid}/medInfo/${info.id}`).set({
          id: info.id,
          value: info.value,
          date: info.date,
          type: info.type
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    medInfo: s => s.medInfo
  }
}