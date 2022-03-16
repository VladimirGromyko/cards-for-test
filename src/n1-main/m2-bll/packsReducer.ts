import {Dispatch} from "redux";
import {loadingAC, LoadingACType} from "./loadingReducer";
import {packsAPI, PacksGetResponseDataType, PacksGetRequestType} from "../m3-dal/packs-api";

export type statePacksType = {
    packsData: PacksGetResponseDataType
    isShownMainPage: boolean
}

const initState = {
    packsData: {},
    isShownMainPage: true
} as statePacksType

export const packsReducer = (state: statePacksType = initState,
                             action: PacksReducerType): statePacksType => {
    switch (action.type) {
        case "SET_PACKS_DATA": {
            return {...state, packsData: action.packsData}
        }
        case "SHOW_MAIN_PAGE": {
            return {...state, isShownMainPage: action.isShownMainPage}
        }
        // case "PACKS/CHANGE_CURRENT_PAGE":
        //     return {...state, page: action.page}
        default:
            return state;
    }
};

export const setPacksDataAC = (packsData: PacksGetResponseDataType) => (
    {type: 'SET_PACKS_DATA', packsData}) as const
export const showMainPageAC = (isShownMainPage: boolean) => (
    {type: 'SHOW_MAIN_PAGE', isShownMainPage}) as const
export const changeCurrentPageAC = (page: number) =>
    ({type: 'PACKS/CHANGE_CURRENT_PAGE', page} as const)
type ChangeCurrentPageACType = ReturnType<typeof changeCurrentPageAC>

export const setPacksDataTC = (packsRequest: PacksGetRequestType) => (dispatch: Dispatch<PacksReducerType>) => {
    dispatch(loadingAC('loading'))
    packsAPI.setPacks(packsRequest)
        .then((res) => {
            dispatch(setPacksDataAC(res.data))

        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
            dispatch(showMainPageAC(false))
        })

}

type SetPacksDataACType = ReturnType<typeof setPacksDataAC>
type showMainPageACType = ReturnType<typeof showMainPageAC>

export type PacksReducerType = SetPacksDataACType
    | LoadingACType
    | showMainPageACType
    | ChangeCurrentPageACType
