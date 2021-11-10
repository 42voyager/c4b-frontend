import IUserData from "@/types/user"
import axios from 'axios'

const API_URL = '/Customer/'

export default class ApiController {
    postUser(user: IUserData): Promise<any> {
        console.log(user.name, user.email)
        return axios.post(API_URL, user)
    }
}
