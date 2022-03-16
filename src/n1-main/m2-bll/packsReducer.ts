import { Dispatch } from "redux"
import { ThunkDispatch } from "redux-thunk"
import {AppStoreType} from "./store";
import {packsApi} from "../m3-dal/packs-api";



const initialState: initialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 6,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: "",
    tokenDeathTime: 0,
    packName: "",
    sortedPackBtn: false,
    min: 2,
    max: 200,
    id: "",
    name: "",
    sortedPackValue: "",
};

export const packsReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "SET-PACKS":
            return {
                ...state,
                ...action.data,
                maxCardsCount: 200,
                minCardsCount: 60,
            }
        default:
            return state
    }
}

export const setPacksAC = (data: initialStateType) => {
    return { type: "SET-PACKS", data } as const
}

export const fetchPacksTC =
    () => (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState().packs;
        const { packName, min, max, page, pageCount, sortedPackValue } = state
        const payload = {
            packName: packName,
            min: min,
            max: max,
            sortPacks: sortedPackValue,
            page: page,
            pageCount: pageCount
        }
        packsApi.getPacks(payload)
            .then((res) => {
                dispatch(setPacksAC(res.data))
            }).catch((e) => {
            const error = e.response ? e.response.data.error:(e.message+", more details in the console")
            console.log(error)
        })
    }


export type initialStateType = {
    cardPacks: cardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
    packName: string
    sortedPackBtn: boolean
    min: number
    max: number
    id: string
    name: string
    sortedPackValue: string
}

export type cardPacksType = {
    cardsCount: number
    created: string
    deckCover: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

type packsReducerACType = ReturnType<typeof setPacksAC>;
type ActionTypes = packsReducerACType