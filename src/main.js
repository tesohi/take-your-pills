import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/common/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(Chartkick.use(Chart))
Vue.filter('date', dateFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyCOy-APSenGRb9Fei3nEhvpt6D-1N3O3jA",
  authDomain: "vue-take-your-pills.firebaseapp.com",
  projectId: "vue-take-your-pills",
  storageBucket: "vue-take-your-pills.appspot.com",
  messagingSenderId: "249385958313",
  appId: "1:249385958313:web:16b1d50484b5ee367362b8",
  measurementId: "G-R1236SC5J9"
})



let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  }
})