<template>
  <div>
    <div class="page-title">
      <h3>Напоминания</h3>
    </div>

    <div class="row">

      <div class="col s6">
        <div class="card">
          <div class="card-content reminders-container">
            
            <div class="card" 
              v-for="reminder in reminders" 
              :key="reminder.id"
            >
              <div class="card-content">
                {{reminder.title}}
              </div>
            </div>

          </div>
        </div>
      </div>

       <div class="col s6">
        <div class="card">

          <div class="card-content params-container">
            
            <div class="card">
              <div class="card-content">
                <select ref="selectType" v-model="selectedType">
                  <option value="" disabled selected>Тип напоминания</option>
                  <option v-for="type in types" :key="type" :value="type"> {{type}} </option>
                </select>
              </div>
            </div>

            <div class="card" v-show="this.selectedType === 'Настраиваемое'">
              <div class="card-content row">
                <div class="col s6">
                  <input ref="datepicker" type="text" class="datepicker" placeholder="Дата начала">
                </div>
                <div class="col s6">
                  <input
                    id="amount_days"
                    type="number"
                    v-model.number="amountDays"
                    placeholder="Количество дней"
                  >
                </div>
              </div>
            </div>

            <div class="card" v-show="this.selectedType === 'Настраиваемое' || this.selectedType === 'Ежедневное'">
              <div class="card-content row">
                <select ref="selectAmountTimes" v-model="selectedAmountTimes">
                  <option value="" disabled selected>Количество раз в день</option>
                  <option v-for="amount in amountTimes" :key="amount" :value="amount"> {{amount}} </option>
                </select>
              </div>
            </div>

            <div class="card" v-show="this.selectedType != null">
              <div class="card-content">
                <input ref="timepicker" type="text" class="timepicker" placeholder="Время напоминания">
              </div>
            </div>
            <div class="card" v-show="this.selectedType != null && this.selectedAmountTimes > 1">
              <div class="card-content">
                <input ref="timepicker2" type="text" class="timepicker" placeholder="Время напоминания 2">
              </div>
            </div>
            <div class="card" v-show="this.selectedType != null && this.selectedAmountTimes > 2">
              <div class="card-content">
                <input ref="timepicker3" type="text" class="timepicker" placeholder="Время напоминания 3">
              </div>
            </div>
            <div class="card" v-show="this.selectedType != null && this.selectedAmountTimes > 3">
              <div class="card-content">
                <input ref="timepicker4" type="text" class="timepicker" placeholder="Время напоминания 4">
              </div>
            </div>

          </div>

          <div class="card-action">
            <form @submit.prevent="addReminder" class="reminder-action-container">
              <input v-model="title" type="text" class="browser-default my-input">
              <input class="browser-default my-submit" type="submit" value="Добавить">
            </form>
          </div>
          
        </div>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    selectType: null,
    datepicker: null,
    selectAmountTimes: null,
    timepicker: null,
    timepicker2: null,
    timepicker3: null,
    timepicker4: null,

    title: '',

    types: ['Единоразовое', 'Ежедневное', 'Настраиваемое'],
    selectedType: null,

    amountDays: null,

    amountTimes: [1, 2, 3, 4],
    selectedAmountTimes: null,

    remindersTime: []

  }),
  computed: {
    reminders() {
      return this.$store.getters.reminders
    }
  },
  methods: {
    async addReminder() {
      if (this.title === '') {
        return
      }

      if (this.timepicker.time) {
        this.remindersTime.push(this.timepicker.time)
      }
      if (this.timepicker2.time) {
        this.remindersTime.push(this.timepicker2.time)
      }
      if (this.timepicker3.time) {
        this.remindersTime.push(this.timepicker3.time)
      }
      if (this.timepicker4.time) {
        this.remindersTime.push(this.timepicker4.time)
      }

      await this.$store.dispatch("addReminder", {
        id: Date.now(),
        title: this.title,
        dateOfStart: this.$refs.datepicker.value,
        amountDays: this.amountDays,
        timesPerDay: this.selectedAmountTimes,
        remidersTime: this.remindersTime
      })

      this.$store.dispatch("fetchReminders") 

      this.title = ''
    }
  },
  async mounted() {
    this.$store.dispatch("fetchReminders")

    setTimeout(() => {
      this.selectType = M.FormSelect.init(this.$refs.selectType)
      this.datepicker = M.Datepicker.init(this.$refs.datepicker, {
        format: 'dd.mm.yyyy',
        i18n: {
          cancel: 'Отмена',
          clear: 'Очистить',
          done: 'Ок',
          months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
          monthsShort: ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'],
          weekdays: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
          weekdaysShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
        }
      })
      this.selectAmountTimes = M.FormSelect.init(this.$refs.selectAmountTimes)

      this.timepicker = M.Timepicker.init(this.$refs.timepicker, {
        twelveHour: false,
        i18n: {
          cancel: 'Отмена',
          clear: 'Очистить',
          done: 'Ок'
        }
      })
      this.timepicker2 = M.Timepicker.init(this.$refs.timepicker2, {
        twelveHour: false,
        i18n: {
          cancel: 'Отмена',
          clear: 'Очистить',
          done: 'Ок'
        }
      })
      this.timepicker3 = M.Timepicker.init(this.$refs.timepicker3, {
        twelveHour: false,
        i18n: {
          cancel: 'Отмена',
          clear: 'Очистить',
          done: 'Ок'
        }
      })
      this.timepicker4 = M.Timepicker.init(this.$refs.timepicker4, {
        twelveHour: false,
        i18n: {
          cancel: 'Отмена',
          clear: 'Очистить',
          done: 'Ок'
        }
      })
    }, 0)
  },
  destroyed() {
    if (this.selectType && this.selectType.destroy) {
      this.selectType.destroy()
    }
    if (this.datepicker && this.datepicker.destroy) {
      this.datepicker.destroy()
    }
    if (this.selectAmountTimes && this.selectAmountTimes.destroy) {
      this.selectAmountTimes.destroy()
    }
    if (this.timepicker && this.timepicker.destroy) {
      this.timepicker.destroy()
    }
    if (this.timepicker2 && this.timepicker2.destroy) {
      this.timepicker2.destroy()
    }
    if (this.timepicker3 && this.timepicker3.destroy) {
      this.timepicker3.destroy()
    }
    if (this.timepicker4 && this.timepicker4.destroy) {
      this.timepicker4.destroy()
    }
  }
}
</script>

<style lang="scss">
.reminders-container {
  height: 74.4vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.params-container {
  height: 68vh;
  overflow-y: auto;
  overflow-x: hidden;
}


.reminder-action-container {
  display: flex;
}

.my-input {
	flex: 12;
	padding: 5px;
	border: 1px solid rgb(175, 175, 175);
	outline: none;
	min-width: 50px;
}

.my-submit {
  &:hover, &:active, &:focus {
    background-color: rgb(97, 158, 187);
  }

	flex: 3;
  color: rgb(240, 248, 255);
	background-color: rgb(97, 158, 187);
	border: 1px solid rgb(84, 160, 196);
	cursor: pointer;
	outline: none;
	padding: 5px;
}
</style>
