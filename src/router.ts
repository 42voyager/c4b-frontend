import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage/LandingPage.vue'
import BankInfoPage from '@/pages/BankInfoPage/BankInfoPage.vue'
import ContractPage from '@/pages/ContractPage/ContractPage.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/bankInfoForm/:id', component: BankInfoPage },
    { path: '/Contract/:id', component: ContractPage }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

