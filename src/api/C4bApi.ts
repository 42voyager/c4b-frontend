import IUserData from "@/types/user"
import IUserFeedBack from "@/types/userFeedBack"
import axios, { AxiosResponse } from 'axios'

const API_URL_USER = '/Customer/'
const API_URL_FEEDBACK = '/Feedback/'

export default class C4bApi {
	async postUser(user: IUserData): Promise<AxiosResponse> {
		return await axios.post(API_URL_USER, user)
	}

	async postUserFeedback(feedback: IUserFeedBack): Promise<AxiosResponse> {
		return await axios.post(API_URL_FEEDBACK, feedback);
	}
}

