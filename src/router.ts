import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage/LandingPage.vue'
import BankInfoPage from '@/pages/BankInfoPage/BankInfoPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/bankInfoForm/:id', component: BankInfoPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

