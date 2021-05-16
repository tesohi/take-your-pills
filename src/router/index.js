import Vue from 'vue'
import VueRouter from 'vue-router'

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
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    meta: {layout: 'main'},
    component: () => import('../views/Notes.vue')
  },
  {
    path: '/pills',
    name: 'Pills',
    meta: {layout: 'main'},
    component: () => import('../views/Pills.vue')
  },
  {
    path: '/analyzes',
    name: 'Analyzes',
    meta: {layout: 'main'},
    component: () => import('../views/Analyzes.vue')
  },
  {
    path: '/recommendations',
    name: 'Recommendations',
    meta: {layout: 'main'},
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

export default router
