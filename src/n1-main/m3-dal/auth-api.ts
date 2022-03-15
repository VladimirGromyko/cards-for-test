import {AxiosResponse} from "axios";
import {instance} from "./instance";

const model1: RecoveryModelType = {
    email: '',
    from: "test-front-admin <vl-mailbox@mail.ru>",
    message: `<div style="background-color: lime; padding: 15px">
                        Password recovery link for project "Cards for test":
                        <a href='https://vladimirgromyko.github.io/cards-for-test#/change-pass/$token$'>
<!--                        <a href='http://localhost:3000/cards-for-test#/change-pass/$token$'>-->
                        link</a>
                       </div >`
}
export const authAPI = {
    getAuth() {
        return instance.post(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/me')
    },
    updateUser(name: string) {
        return instance.put<{ name: string },AxiosResponse<ResponseType>>('auth/me', {name});
    },
    recoverPass(email: string) {
        return instance.post <{ model: RecoveryModelType, }, AxiosResponse<RecoverPassResponseType>>
        (`/auth/forgot`, {...model1, email: email})
    },
    setNewPass(password: string, resetPasswordToken: string | undefined) {
        return instance.post <{ password: string, resetPasswordToken: string | undefined},
            AxiosResponse<RecoverPassResponseType>>
        (`/auth/set-new-password`, {password, resetPasswordToken})
    },
    registrationUser(email:string, password: string) {
        return instance.post(`auth/register`, {email, password});
    },
}
export type RecoverPassResponseType = {
    info: string
    error: string
}
type RecoveryModelType = {
    email: string,
    from: string,
    message: string
}