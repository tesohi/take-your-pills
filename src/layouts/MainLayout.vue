<template>
  <div>
    <Loader v-if="loading" />

    <div class="app-main-layout" v-else>
      
      <Navbar @burger-click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" />      

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/common/messages'
import dateFilter from '@/filters/date.filter'

export default {
  name: 'MainLayout',
  data: () => ({
    isOpen: true,
    loading: true,

    reminders: null
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false

    const reminders = await this.$store.dispatch('fetchReminders')

    let previousTime = dateFilter(new Date(), 'hourminute')

    reminders.map(reminder => {
      reminder.remindersTime.map(t => {
        if (t == dateFilter(new Date(), 'hourminute')) {
          this.$message(reminder.title)
        }
      })
    })

    setInterval(() => {
      if (previousTime != dateFilter(new Date(), 'hourminute')) {
        reminders.map(reminder => {
          reminder.remindersTime.map(t => {
            if (t == dateFilter(new Date(), 'hourminute')) {
              this.$message(reminder.title)
            }
          })
        })

        previousTime = dateFilter(new Date(), 'hourminute')
      }
    }, 1000)
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>