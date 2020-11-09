import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import TaskAll from '../views/tasks/TaskAll.vue'
import TaskEdit from '../views/tasks/TaskEdit.vue'
import TaskCreate from '../views/tasks/TaskCreate.vue'
import * as auth from '../services/AuthService'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'tasks-all',
    component: TaskAll,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/tasks/new',
    name: 'task-create',
    component: TaskCreate,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/tasks/:id',
    name: 'tasks-edit',
    component: TaskEdit,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

export default router
