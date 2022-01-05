import IUserData from "@/types/user"
import IUserFeedBack from "@/types/userFeedBack"
import IBankInfo from "@/types/bankInfo"
import axios, { AxiosResponse } from 'axios'

const API_URL_USER = '/Customer/'
const API_URL_FEEDBACK = '/Feedback/'
const API_URL_BANK_INFO = '/BankInfo/'

export default class C4bApi {
	async postUser(user: IUserData): Promise<AxiosResponse> {
		return await axios.post(API_URL_USER, user)
	}

	async postUserFeedback(feedback: IUserFeedBack): Promise<AxiosResponse> {
		return await axios.post(API_URL_FEEDBACK, feedback);
	}

	async postBankInfo(bankInfo: IBankInfo): Promise<AxiosResponse> {
		return await axios.post(API_URL_BANK_INFO, bankInfo);
	}
}

