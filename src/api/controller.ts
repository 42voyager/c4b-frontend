import IUserData from "@/types/user"
import axios from 'axios'

const API_URL = 'http://localhost:8081/Customer/'

export default class ApiController {
    postUser(user: IUserData):void {
        console.log(user.name, user.email)
        axios.post(API_URL, user)
            .then(response => {
                console.log('Usuario Adicionado', response)
            })
            .catch(error => {
                console.error('Erro ao criar Usuario', error)
            })
    }
}