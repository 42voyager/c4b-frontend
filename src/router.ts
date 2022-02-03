import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage/LandingPage.vue'
import BankInfoPage from '@/pages/BankInfoPage/BankInfoPage.vue'
import ContractPage from '@/pages/ContractPage/ContractPage.vue'
import ErrorPage from '@/pages/ErrorPage/ErrorPage.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/bankInfoForm/:id', component: BankInfoPage },
    { path: '/contractSign/:id', component: ContractPage },
    { path: '/Error', component: ErrorPage }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

