import {instance} from "./instance";
import {AxiosResponse} from "axios";

export const authsAPI = {

    updateUser(name: string) {
        return instance.put<{ name: string },AxiosResponse<ResponseType>>('auth/me', {name});
    }
}

export const cardsAPI = {

    getAllCards(cardsPackId?: string, pageCount?:string) {
        return instance.get(`/cards/card?cardsPack_id=${cardsPackId}&pageCount=${pageCount}`, );
    }
}

