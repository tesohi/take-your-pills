<template>
  <div>
    <div class="page-title">
      <h3>Мед данные</h3>
    </div>

    <div class="row">

      <div class="col s3 my-container my-flex">

        <div class="card">
          <div class="card-content">
            
            <form @submit.prevent="addWeightHandler">

              <div class="input-field">
                <i class="material-icons prefix">person_outline</i>
                <input
                  id="weight"
                  type="text"
                  v-model="weight"
                >
                <label for="weight">Вес</label>
              </div>

              <button
                class="btn-small waves-effect waves-light" type="submit"
              >Добавить
                <i class="material-icons right">send</i>
              </button>

            </form>

          </div>
        </div>

        <div class="card">
          <div class="card-content">
            
            <form @submit.prevent="addPreasureHandler">
              <div class="input-field">
                <i class="material-icons prefix">favorite_border</i>
                <input
                  id="preasure"
                  type="text"
                  v-model="preasure"
                >
                <label for="preasure">Артериальное давление</label>
              </div>
              <button
                class="btn-small waves-effect waves-light" type="submit"
              >Добавить
                <i class="material-icons right">send</i>
              </button>
            </form>

          </div>
        </div>

        <div class="card">
          <div class="card-content">
            
            <form @submit.prevent="addSugarHandler">
              <div class="input-field">
                <i class="material-icons prefix">radio_button_unchecked</i>
                <input
                  id="sugar"
                  type="text"
                  v-model="sugar"
                >
                <label for="sugar">Уровень сахара</label>
              </div>
              <button
                class="btn-small waves-effect waves-light rig" type="submit"
              >Добавить
                <i class="material-icons right">send</i>
              </button>
            </form>

          </div>
        </div>

      </div>

      <div class="col s5">

        <div class="card my-container">
          <div class="card-content">

            <Loader v-if="this.loading"/>

            <table v-if="!this.loading">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Категория</th>
                  <th>Дата</th>
                  <th>Значение</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(record, idx) in records" :key="record.id">
                  <td>{{idx + 1}}</td>
                  <td>{{record.type}}</td>
                  <td>{{record.date | date('datehourminute')}}</td>
                  <td>{{record.value}}</td>
                </tr>
              </tbody>
            </table> 

          </div>
        </div>

      </div>

      <div class="col s4">

        <div v-if="true">
          <p class="my-margin">Показатели веса</p>

          <line-chart
            :data="weightChartData"
            :messages="{empty: 'No data'}"
            height="177px"
          ></line-chart>

        </div>

        <div v-if="true">
          <p>Показатели артериального давления</p>

          <line-chart
            :data="preasureChartData"
            :messages="{empty: 'No data'}"
            height="177px"
          ></line-chart>

        </div>

        <div v-if="true">
          <p>Показатели уровня сахара в крови</p>

          <line-chart
            :data="sugarChartData"
            :messages="{empty: 'No data'}"
            height="177px"
          ></line-chart>

        </div>

      </div>
      
    </div>

  </div>
</template>

<script>
import dateFilter from '@/filters/date.filter'

export default {
  data: () => ({
    loading: true,

    weight: '',
    preasure: '',
    sugar: '',

    weightChartData: [],
    preasureChartData: [],
    sugarChartData: []
  }),

  computed: {
    records() {
      return this.$store.getters.medInfo
    }
  },

  async mounted() {
    await this.updateData()
  },

  methods: {
    async updateData() {
      this.loading = true
      await this.$store.dispatch('fetchMedInfo')

      this.weightChartData = this.$store.getters.medInfo
        .filter(r => r.type === 'Вес')
        .reverse()
        .map(elem => {
          return [dateFilter(elem.date, 'allshort'), elem.value]
        })

      this.preasureChartData = this.$store.getters.medInfo
        .filter(r => r.type === 'Артериальное давление')
        .reverse()
        .map(elem => {
          return [dateFilter(elem.date, 'allshort'), elem.value]
        })

      this.sugarChartData = this.$store.getters.medInfo
        .filter(r => r.type === 'Сахар в крови')
        .reverse()
        .map(elem => {
          return [dateFilter(elem.date, 'allshort'), elem.value]
        })

      this.loading = false
    },

    async addWeightHandler() {
      if (this.weight.match(/^\d(\d)?(\d)?([.]\d(\d)?(\d)?)?$/)) {

        await this.$store.dispatch('addMedInfo', {
          type: 'Вес',
          id: Date.now(),
          date: new Date().toJSON(),
          value: this.weight
        })

        this.weight = ''

        await this.updateData()

      } else {

        if (this.weight === '') {
          this.$message('Введите значение веса')
          return
        }

        this.$message('Введите корректное значение веса')

      }
    },

    async addPreasureHandler() {
      if (this.preasure.match(/^\d\d(\d)?[/]\d\d(\d)?$/)) {

        await this.$store.dispatch('addMedInfo', {
          type: 'Артериальное давление',
          id: Date.now(),
          date: new Date().toJSON(),
          value: this.preasure
        })

        this.preasure = ''

        await this.updateData()

      } else {
        if (this.preasure === '') {
          this.$message('Введите значение артериального давления')
          return
        }

        this.$message('Введите корректное значение артериального давления')
      }
    },

    async addSugarHandler() {
      if (this.sugar.match(/^\d(\d)?([.]\d(\d)?)?$/) && this.sugar < 35) {
        await this.$store.dispatch('addMedInfo', {
          type: 'Сахар в крови',
          id: Date.now(),
          date: new Date().toJSON(),
          value: this.sugar
        })

        this.sugar = ''

        await this.updateData()

      } else {
        if (this.sugar === '') {
          this.$message('Введите значение уровня сахара в крови')
          return
        } 

        this.$message('Введите корректное значение уровня сахара в крови')
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.my-container {
  height: 67.7vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.my-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70vh;
}

.card {
  flex-grow: 1;
}

.btn-small {
  margin-top: 1rem;
}

.my-margin {
  margin-top: 3px;
}
</style>