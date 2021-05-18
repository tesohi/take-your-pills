import firebase from 'firebase/app'

export default {
  state: {
    notes: null
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes
    }
  },
  actions: {
    async fetchNotes({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid') 
        const notesObj = (await firebase.database().ref(`/users/${uid}/notes`).once('value')).val()
        const notesArr = []

        for (let noteId in notesObj) {
          notesArr.unshift(notesObj[noteId])
        }

        commit('setNotes', notesArr)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addNote({dispatch, commit}, note){
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/notes/${note.id}`).set({
          id: note.id,
          title: note.title,
          body: note.body
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteNote(state, note) {
      
    }
  },
  getters: {
    notes: s => s.notes
  }
}