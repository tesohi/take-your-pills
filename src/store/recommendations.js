import firebase from 'firebase/app'

export default {
  state: {
    recommendations: null
  },
  mutations: {
    setRecommendations(state, recommendations) {
      state.recommendations = recommendations
    }
  },
  actions: {
    async fetchRecommendations({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid') 
        const recommendationsObj = (await firebase.database().ref(`/users/${uid}/recommendations`).once('value')).val()
        const recommendationsArr = []

        for (let recommendationId in recommendationsObj) {
          recommendationsArr.unshift(recommendationsObj[recommendationId])
        }

        commit('setRecommendations', recommendationsArr)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addRecommendation({dispatch, commit}, recommendation){
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/recommendations/${recommendation.id}`).set({
          id: recommendation.id,
          doctorName: recommendation.doctorName,
          body: recommendation.body
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteRecommendation({dispatch, commit}, recommendationId) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/recommendations/${recommendationId}`).remove() 
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    recommendations: s => s.recommendations
  }
}