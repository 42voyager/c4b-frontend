import IUserData from '@/types/user'
import IUserFeedBack from '@/types/userFeedBack'
import IUserFeedBackStar from '@/types/userFeedBackStar'
import IBankInfo from '@/types/bankInfo'
import axios, { AxiosResponse } from 'axios'
import IContract from '@/types/contract'
import ICredit from '@/types/credit'

const API_URL_USER = '/Customer/'
const API_URL_FEEDBACK = '/Feedback/'
const API_URL_BANK_INFO = '/BankInfo/'
const API_URL_CREDIT = '/Credit/'
const API_URL_CONTRACT = '/Contract/'
const API_URL_RATESTAR = '/FeedbackStar/'
const API_URL_REPORT = '/Report/'


export const c4bApi = {
    user: (): C4bApiUser => {
        return apiUser
    },
    bankInfo: (): C4bApiBankInfo => {
        return apiBankInfo
    },
    feedback: (): C4bApiFeedback => {
        return apiFeedback
    },
    feedbackStar: (): C4bApiFeedbackStar => {
        return apiFeedbackStar
    },
    contract: (): C4bApiContract => {
        return apiContract
    },
    credit: (): C4bApiCredit => {
        return apiCredit
    },
    report: (): C4bApiReport => {
        return apiReport
    }
}
class C4bApiBase<T> {
    protected endpoint = ''

    async post(entity: T): Promise<AxiosResponse> {
        return await axios.post(this.endpoint, entity)
    }
    async get(hash?: string): Promise<AxiosResponse> {
        return await axios.get(this.endpoint + hash)
    }
    async put(entity: T): Promise<AxiosResponse> {
        return await axios.put(this.endpoint, entity)
    }
}

class C4bApiUser extends C4bApiBase<IUserData> {
    protected endpoint = API_URL_USER
}

class C4bApiBankInfo extends C4bApiBase<IBankInfo> {
    protected endpoint = API_URL_BANK_INFO
}

class C4bApiFeedback extends C4bApiBase<IUserFeedBack> {
    protected endpoint = API_URL_FEEDBACK
}

class C4bApiContract extends C4bApiBase<IContract> {
    protected endpoint = API_URL_CONTRACT
}

class C4bApiFeedbackStar extends C4bApiBase<IUserFeedBackStar> {
    protected endpoint = API_URL_RATESTAR
}

class C4bApiCredit extends C4bApiBase<ICredit> {
    protected endpoint = API_URL_CREDIT
}

class C4bApiReport extends C4bApiBase<ICredit> {
    protected endpoint = API_URL_REPORT
}

const apiUser = new C4bApiUser()
const apiBankInfo = new C4bApiBankInfo()
const apiFeedback = new C4bApiFeedback()
const apiContract = new C4bApiContract()
const apiFeedbackStar = new C4bApiFeedbackStar()
const apiCredit = new C4bApiCredit()
const apiReport = new C4bApiReport()
