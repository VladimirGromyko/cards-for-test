

// api
import {instance} from "./instance";

export const registerAPI = {
    registrationUser(email:string, password: string) {
        return instance.post(`auth/register`, {email, password});
    },
   
}
