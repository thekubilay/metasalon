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
    path: '/entry',
    name: 'Entry',
    component: () => import('../views/Entry.vue')
  },
  {
    path: '/booths',
    name: 'Booths',
    component: () => import('../views/Booths.vue')
  },
  // { path: '/:pathMatch(.*)*', redirect: "404" },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
  routes
})

router.beforeEach((to, from) => {

})

export default router;
