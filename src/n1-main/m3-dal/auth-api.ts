import {AxiosResponse} from "axios";
import {instance} from "./instance";

const model1: RecoveryModelType = {
    email: '',
    from: "test-front-admin <vl-mailbox@mail.ru>",
    message: `<div style="background-color: lime; padding: 15px">
                        password recovery link:
                        <a href='http://localhost:3001/cards-for-test#/change-pass/$token$'>
                        link</a>
                       </div >`
}
export const authAPI = {
    recoverPass(email: string) {
        return instance.post < {model: RecoveryModelType, }, AxiosResponse < ResponseType >>
        (`/auth/forgot`, {...model1, email: email})
    }
}
export type ResponseType = {
    info: string
    error: string
}
type RecoveryModelType = {
    email: string,
    from: string,
    message: string
}
