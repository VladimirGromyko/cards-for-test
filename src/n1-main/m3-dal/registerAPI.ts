import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// api
export const registerAPI = {
    registrationUser(email:string, password: string) {
        return instance.post(`auth/register`, {email, password});
    },
   
}
