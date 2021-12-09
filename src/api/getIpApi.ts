import axios from 'axios'

const API_URL = 'https://api.ipify.org?format=json'

export default class GetIPApi {
    getIP(): Promise<{data:{ip:string}}> {
        return axios.get(API_URL)
    }
}