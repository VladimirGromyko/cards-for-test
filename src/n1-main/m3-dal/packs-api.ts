import {instance} from "./instance";
import {AxiosResponse} from "axios";

export const packsAPI = {

    setPacks(packsRequest: PacksRequestType) {
        return instance.get <PacksRequestType, AxiosResponse<PacksDataType>>('cards/pack',
            {params: {packsRequest}});
    }
}
export type PacksRequestType = {
    packName?: string, // не обязательно
    min?: number, // не обязательно
    max?: number,  // не обязательно
    sortPacks?: string, // не обязательно
    page?: number, // не обязательно
    pageCount?: number, // не обязательно
    user_id?: string
}

export type PacksDataType = {
    cardPacks: [
        {
            _id: string
            user_id: string
            name: string
            cardsCount: number
            created: string
            updated: string
        },
    ]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number     // количество элементов на странице
}