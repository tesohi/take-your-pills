<template>
  <div>

    <div class="page-title">
      <h3>Рекомендации врачей</h3>
    </div>

    <div class="row">
      <div class="col s9">
        <div class="card">
          <div class="card-content">
            
            <div class="input-field textbox">
              <input 
                id="title_inline" 
                type="text"
                v-model="doctorName" 
                :class="{invalid: ($v.doctorName.$dirty && !$v.doctorName.required)}"
              >
              <label for="title_inline">Имя доктора</label>
              <small
                class="helper-text invalid"
                v-if="$v.doctorName.$dirty && !$v.doctorName.required"
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
              @click.prevent="addRecommendation"
            >Добавить
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row recommendations">
      <div class="col s6">
        <div
          class="card"
          v-for="recommendation in recommendations"
          :key="recommendation.id"
        >
          <div class="card-content">
            <span class="card-title">{{recommendation.doctorName}}</span>
            <p>{{recommendation.body}}</p>
            <div 
              class="btn-floating btn-small halfway-fab waves-effect waves-light red"
              @click="deleteRecommendation(recommendation.id)"
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
  name: "Recommendations",
  data() {
    return {
      doctorName: '',
      body: ''
    }
  },
  validations: {
    doctorName: {required},
    body: {required}
  },
  computed: {
    recommendations() {
      return this.$store.getters.recommendations
    }
  },
  async mounted() {
    this.$store.dispatch("fetchRecommendations")
  },
  methods: {
    async addRecommendation() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      await this.$store.dispatch("addRecommendation", {
        id: Date.now(),
        doctorName: this.doctorName,
        body: this.body
      })

      this.$store.dispatch("fetchRecommendations") 

      this.doctorName = ''
      this.body = ''
    },
    async deleteRecommendation(recommendationId) {
      await this.$store.dispatch("deleteRecommendation", recommendationId)
      
      this.$store.dispatch("fetchRecommendations") 
    }
  }
}
</script>

<style lang="scss">
.textbox {
  max-width: 380px;
}

.textarea-width {
  max-width: 750px;
}

.line {
  margin-top: 1rem;
  opacity: 0.3;
}

.recommendations {
  margin-top: 2rem;
}
</style>