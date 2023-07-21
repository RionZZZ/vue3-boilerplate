import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { UserStore } from '@/stores'

const layoutViews: RouteRecordRaw[] = []
const noLayoutViews: RouteRecordRaw[] = []
generatedRoutes.forEach(route => {
  if (route.meta?.layout !== false) {
    layoutViews.push(route)
  } else {
    noLayoutViews.push(route)
  }
})
const routes = [...setupLayouts(layoutViews), ...noLayoutViews, { path: '/', redirect: '/login' }]
// const routes: RouteConfig[] = generatedRoutes
console.log(routes)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const userStore = UserStore()
  console.log(to)
  if (!userStore.token && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
