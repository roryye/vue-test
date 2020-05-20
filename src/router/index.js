import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import NavBar from '@/components/NavBar'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/h',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    // {
    //   path: '/',
    //   name: 'Nav',
    //   component: NavBar
    // }
  ]
})
