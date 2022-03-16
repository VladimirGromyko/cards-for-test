import {instance} from "./instance";
import {AxiosResponse} from "axios";

export const authsAPI = {

    updateUser(name: string) {
        return instance.put<{ name: string },AxiosResponse<ResponseType>>('auth/me', {name});
    }
}

export const cardsAPI = {
    getCards: (payload: GetCardsPayload) => {
        return instance.get("/cards/card", {
            params: { ...payload },
        });
    }


    export type GetCardsPayload = {
        cardAnswer: string
        cardQuestion: string
        cardsPack_id: string
        min: number
        max: number
        sortCards: string
        page: number
        pageCount: number
    }