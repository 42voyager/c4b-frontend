import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LandingPage from '@/pages/LandingPage/LandingPage.vue'
import BankInfoPage from '@/pages/BankInfoPage/BankInfoPage.vue'
import ContractPage from '@/pages/ContractPage/ContractPage.vue'
import ErrorPage from '@/pages/ErrorPage/ErrorPage.vue'
import { c4bApi } from './api/C4bApi'

enum UserProgressState {
    CreditRequested,
    BankInfoSent,
    ContractSigned,
}

/**
 * A function to find the state of the business process in which the user is
 * @param hash hash value to identify a user in the system
 * @returns UserProgressState, in which step of the business process the user is
 */
const getUserProgressState = async (hash: string) => {
    try {
        // Check if the user already have Bank information
        await c4bApi.bankInfo().get(hash)
        // Check if the user already have contract signed
        const contractInfo = await c4bApi.contract().get(hash)
        if (
            contractInfo.data.acceptTerms == true ||
            contractInfo.data.authorizeSCR == true ||
            contractInfo.data.existsPEP == true
        )
            return UserProgressState.ContractSigned
        else {
            return UserProgressState.BankInfoSent
        }
    } catch (err: any) {
        return UserProgressState.CreditRequested
    }
}

/**
 * Check if the hash value exists for a user
 * @param hash hash value to identify a user in the system
 * @returns true if the user is valid, false if not
 */
const isValidUser = async (hash: string) => {
    try {
        await c4bApi.user().get(hash)
        return true
    } catch (err: any) {
        return false
    }
}

const routes: RouteRecordRaw[] = [
    { path: '/', component: LandingPage },
    {
        path: '/bankInfoForm/:id',
        component: BankInfoPage,
        beforeEnter: async (to) => {
            const isValid = await isValidUser(to.params.id as string)
            if (!isValid) return '/Error'

            const userState = await getUserProgressState(to.params.id as string)
            if (userState == UserProgressState.BankInfoSent)
                return '/contractSign/' + to.params.id
            if (userState == UserProgressState.ContractSigned) return '/Error'
            if (userState == UserProgressState.CreditRequested) return
        },
    },
    { path: '/contractSign/:id', component: ContractPage },
    { path: '/Error', component: ErrorPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
