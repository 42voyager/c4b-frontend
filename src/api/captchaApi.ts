import axios from 'axios'

const API_URL = 'https://www.google.com/recaptcha/api/siteverify'
const SECRET = '6LfrEXUdAAAAAMkL4sDemtSjhQu1uN66UGf3P_W3'

export default class CaptchaApi {
    postToken(token: string): Promise<any> {
        return axios.post(API_URL, {
            secret: SECRET,
            response: token
        })
    }
}
