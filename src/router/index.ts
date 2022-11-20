import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/lobby',
    name: 'Entry',
    component: () => import('../views/Entry.vue')
  },
  {
    path: '/onlines',
    name: 'Onlines',
    component: () => import('../views/PlayerList.vue')
  },
  {
    path: '/office',
    redirect: "login"
  },
  {
    path: '/office/:id',
    name: 'Office',
    component: () => import('../views/Office.vue')
  },
  // { path: '/:pathMatch(.*)*', redirect: "404" },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
  routes
})
export default router;
