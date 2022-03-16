import {instance} from "./instance";
import {AxiosResponse} from "axios";

export const packsAPI = {

    setPacks(param: PacksGetRequestType) {
        return instance.get <PacksGetRequestType, AxiosResponse<PacksGetResponseDataType>>(`cards/pack`,
            param);
    },
    postPacks(cardsPack: PacksPostRequestType) {
        return instance.post <PacksPostRequestType, AxiosResponse<PacksPostResponseType>>('cards/pack',
            cardsPack);
    },
    deletePacks(param: PacksDeleteRequestType) {
        return instance.delete <PacksDeleteRequestType, AxiosResponse<PacksDeleteResponseType>>('cards/pack',
            param);
    },
    putPacks(cardsPack: PacksPutRequestType) {
        return instance.put <PacksPutRequestType, AxiosResponse<PacksPutResponseType>>('cards/pack',
            cardsPack);
    },
}
export type PacksGetRequestType = {
    params: PacksGetRequestDataType
}
type PacksGetRequestDataType = {
    packName?: string, // не обязательно
    min?: number, // не обязательно
    max?: number,  // не обязательно
    sortPacks?: string, // не обязательно
    page?: number, // не обязательно
    pageCount?: number, // не обязательно
    user_id?: string  // не обязательно
}

export type PacksGetResponseDataType = {
    cardPacks:
        [{
            _id: string
            user_id: string
            name: string
            cardsCount: number
            created: string
            updated: string
        },]

    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number     // количество элементов на странице
}
export type CardPacksType={
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

export type PacksPostRequestType = {
    name?: string
    deckCover?: string
    private?: boolean
}
export type PacksPostResponseType = {
    newCardsPack: {}
}
export type PacksDeleteRequestType = {
    params: { id: string }
}
export type PacksDeleteResponseType = {
    deletedCardsPack: {}
}
export type PacksPutRequestType = {
    _id: string
    name?: string
}
export type PacksPutResponseType = {
    updatedCardsPack: {}
}