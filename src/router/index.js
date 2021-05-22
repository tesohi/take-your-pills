import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Notes.vue')
  },
  {
    path: '/medInfo',
    name: 'MedInfo',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/MedInfo.vue')
  },
  {
    path: '/pills',
    name: 'Pills',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Pills.vue')
  },
  {
    path: '/analyzes',
    name: 'Analyzes',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Analyzes.vue')
  },
  {
    path: '/recommendations',
    name: 'Recommendations',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Recommendations.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main'},
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
