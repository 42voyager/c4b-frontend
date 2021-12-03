import IUserData from "@/types/user"
import IUserFeedBack from "@/types/userFeedBack"
import axios from 'axios'

const API_URL_USER = '/Customer/'
const API_URL_FEEDBACK = '/Feedback/'

export default class ApiController {
    postUser(user: IUserData): Promise<any> {
        console.log(user.name, user.email)
        return axios.post(API_URL_USER, user)
    }

    postUserFeedback(feedback: IUserFeedBack): Promise<any> {
        return axios.post(API_URL_FEEDBACK, feedback);
    }
}
