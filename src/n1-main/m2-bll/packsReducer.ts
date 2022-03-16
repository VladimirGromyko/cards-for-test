import {Dispatch} from "redux";
import {loadingAC, LoadingACType} from "./loadingReducer";
import {packsAPI, PacksGetResponseDataType, PacksGetRequestType, PacksPutRequestType} from "../m3-dal/packs-api";
import {responseErrorAC, ResponseErrorACType} from "./errorReducer";


export type statePacksType = {
    packsData: PacksGetResponseDataType
    updatedCardsPack: {}
    isShownMainPage: boolean
    isShownEditPack: boolean
    pickedEditPack: { packName: string, packId: string }
}

const initState = {
    packsData: {},
    updatedCardsPack: {},
    isShownMainPage: true,
    isShownEditPack: false,
    pickedEditPack: {packName: '', packId: ''}
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
        case "EDIT_PACK": {
            return {...state, updatedCardsPack: action.updatedCardsPack}
        }
        case "SHOW_EDIT_PACK": {
            return {...state, isShownEditPack: action.isShownEditPack}
        }
        case "PICK_EDIT_PACK": {
            return {...state, pickedEditPack: {packName: action.packName, packId: action.packId}}
        }
        default:
            return state;
    }
};

export const setPacksDataAC = (packsData: PacksGetResponseDataType) => (
    {type: 'SET_PACKS_DATA', packsData}) as const
export const editPackAC = (updatedCardsPack: {}) => (
    {type: 'EDIT_PACK', updatedCardsPack}) as const


export const pickEditPackAC = (packName: string, packId: string) => (
    {type: 'PICK_EDIT_PACK', packName, packId}) as const

export const showMainPageAC = (isShownMainPage: boolean) => (
    {type: 'SHOW_MAIN_PAGE', isShownMainPage}) as const

export const showEditPackAC = (isShownEditPack: boolean) => (
    {type: 'SHOW_EDIT_PACK', isShownEditPack}) as const

export const setPacksDataTC = (packsRequest: PacksGetRequestType) => (dispatch: Dispatch<PacksReducerType>) => {
    dispatch(loadingAC('loading'))
    packsAPI.setPacks(packsRequest)
        .then((res) => {
            dispatch(setPacksDataAC(res.data))
        })
        .catch((err) => {
            dispatch(responseErrorAC(true, 'setPacks', err.response?.data.error))
            setTimeout(() => {
                dispatch(responseErrorAC(false, 'setPacks', err.response?.data.error))
            }, 3000)
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
            dispatch(showMainPageAC(false))
        })

}
export const editPackTC = (param: PacksPutRequestType) => (dispatch: Dispatch<PacksReducerType>) => {
    dispatch(loadingAC('loading'))
    packsAPI.putPacks(param)
        .then((res) => {
            dispatch(showEditPackAC(true))
            dispatch(editPackAC(res.data.updatedCardsPack))
            // dispatch(setPacksDataTC())
        })
        .catch((err) => {
            dispatch(showEditPackAC(true))
            dispatch(responseErrorAC(true, 'editPack', err.response?.data.error))
            setTimeout(() => {
                dispatch(showEditPackAC(false))
                dispatch(responseErrorAC(false, 'editPack', err.response?.data.error))
            }, 4000)
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
            // dispatch(showMainPageAC(false))
        })

}


type SetPacksDataACType = ReturnType<typeof setPacksDataAC>
type editPackACType = ReturnType<typeof editPackAC>
type showMainPageACType = ReturnType<typeof showMainPageAC>
type showEditPackACType = ReturnType<typeof showEditPackAC>
type pickEditPackACType = ReturnType<typeof pickEditPackAC>

export type PacksReducerType = SetPacksDataACType
    | LoadingACType
    | showMainPageACType
    | editPackACType
    | showEditPackACType
    | ResponseErrorACType
    | pickEditPackACType
