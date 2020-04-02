import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Index.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/editor/100'
    },
    {
      path: '/editor/:workId', // #!zh 编辑器页面，核心功能部分
      name: 'editor',
      component: () => import('./views/Editor.vue')
    },
    {
      path: '/preview/:workId', // #!zh 编辑器页面，核心功能部分
      name: 'preview',
      component: () => import('./views/Preview.vue')
    }
  ]
})
