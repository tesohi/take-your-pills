<template>
  <div>
    <div class="page-title">
      <h3>Заметки</h3>
    </div>

    <!-- <div class="input-field inline">
      <input v-model="title" id="title_inline" type="text" class="validate">
      <label for="title_inline">Заголовок</label>
    </div>

    <div class="input-field">
      <textarea v-model="body" id="textarea1" class="materialize-textarea textarea-width"></textarea>
      <label for="textarea1">Заметка</label>
    </div>

    <button 
      class="btn waves-effect waves-light" type="submit" name="action"
      @click.prevent="addNote"
    >Добавить
      <i class="material-icons right">send</i>
    </button>

    <hr class="line"> -->

    <div class="row">
      <div class="col s9">
        <div class="card">
          <div class="card-content">
            
            <div class="input-field inline">
              <input 
                id="title_inline" 
                type="text"
                v-model="title" 
                :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
              >
              <label for="title_inline">Заголовок</label>
              <small
                class="helper-text invalid"
                v-if="$v.title.$dirty && !$v.title.required"
              >Введите заголовок</small>
            </div>

            <div class="input-field">
              <textarea 
                class="materialize-textarea textarea-width"
                id="textarea1" 
                v-model="body" 
                :class="{invalid: ($v.body.$dirty && !$v.body.required)}"
              ></textarea>
              <label for="textarea1">Заметка</label>
              <small
                class="helper-text invalid"
                v-if="$v.body.$dirty && !$v.body.required"
              >Введите текст заметки</small>
            </div>

          </div>
          <div class="card-action">
            <button 
              class="btn waves-effect waves-light" type="submit" name="action"
              @click.prevent="addNote"
            >Добавить
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row notes">
      <div class="col s6">
        <div
          class="card my-card"
          v-for="note in notes"
          :key="note.id"
        >
          <div class="card-content">
            <span class="card-title">{{note.title}}</span>
            <p>{{note.body}}</p>
            <div 
              class="btn-floating btn-small halfway-fab waves-effect waves-light red"
              @click="deleteNote(note.id)"
            >
              <i class="material-icons">delete</i>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  name: "Notes",
  data() {
    return {
      title: '',
      body: ''
    }
  },
  validations: {
    title: {required},
    body: {required}
  },
  computed: {
    notes() {
      return this.$store.getters.notes
    }
  },
  async mounted() {
    this.$store.dispatch("fetchNotes")
  },
  methods: {
    async addNote() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      await this.$store.dispatch("addNote", {
        id: Date.now(),
        title: this.title,
        body: this.body
      })

      this.$store.dispatch("fetchNotes") 

      this.title = ''
      this.body = ''
    },
    async deleteNote(noteId) {
      await this.$store.dispatch("deleteNote", noteId)
      
      this.$store.dispatch("fetchNotes") 
    }
  }
}
</script>

<style lang="scss">
.textarea-width {
  max-width: 750px;
}

.line {
  margin-top: 1rem;
  opacity: 0.3;
}

.notes {
  margin-top: 2rem;
}

.my-card {
  margin-top: 1.5rem;
}
</style>