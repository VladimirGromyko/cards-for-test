import {Dispatch} from "redux";
import {loadingAC, LoadingACType} from "./loadingReducer";
import {
    packsAPI,
    PacksGetResponseDataType,
    PacksGetRequestType,
    PacksPutRequestType,
    PacksPostRequestType, PacksDeleteRequestType
} from "../m3-dal/packs-api";
import {responseErrorAC, ResponseErrorACType} from "./errorReducer";
import {ThunkType} from "./store";
import {responseConfirmAC, ResponseConfirmACType} from "./answeredReducer";

export type statePacksType = {
    packsData: PacksGetResponseDataType
    updatedCardsPack: {}
    isShownMainPage: boolean
    isShownEditPack: boolean
    isShownAddPack: boolean
    isShownDeletePack: boolean
    pickedEditPack: { packName: string, packId: string }
    pickedDeletePack: { packName: string, packId: string }
    currentPage: number
}

const initState = {
    packsData: {},
    updatedCardsPack: {},
    isShownMainPage: true,
    isShownEditPack: false,
    isShownAddPack: false,
    isShownDeletePack: false,
    pickedEditPack: {packName: '', packId: ''},
    pickedDeletePack: {packName: '', packId: ''},
    currentPage: 1
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
        case "PICK_DELETE_PACK": {
            return {...state, pickedDeletePack: {packName: action.packName, packId: action.packId}}
        }
        case "SHOW_ADD_PACK": {
            return {...state, isShownAddPack: action.isShownAddPack}
        }
        case "SHOW_DELETE_PACK": {
            return {...state, isShownDeletePack: action.isShownDeletePack}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
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

export const pickDeletePackAC = (packName: string, packId: string) => (
    {type: 'PICK_DELETE_PACK', packName, packId}) as const

export const showMainPageAC = (isShownMainPage: boolean) => (
    {type: 'SHOW_MAIN_PAGE', isShownMainPage}) as const

export const showEditPackAC = (isShownEditPack: boolean) => (
    {type: 'SHOW_EDIT_PACK', isShownEditPack}) as const

export const showAddPackAC = (isShownAddPack: boolean) => (
    {type: 'SHOW_ADD_PACK', isShownAddPack}) as const

export const showDeletePackAC = (isShownDeletePack: boolean) => (
    {type: 'SHOW_DELETE_PACK', isShownDeletePack}) as const

export const setCurrentPageAC = (currentPage: number) => (
    {type: 'SET_CURRENT_PAGE', currentPage}) as const

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

export const setCurrentPageTC = (pageNumber: number): ThunkType =>
    (dispatch, getState) => {
        dispatch(setCurrentPageAC(pageNumber))
        dispatch(setPacksDataTC({
            params: {
                page: pageNumber,
                pageCount: getState().packs.packsData.pageCount
            }
        }))
    }

export const addPacksTC = (pack: PacksPostRequestType): ThunkType =>
    (dispatch, getState) => {
        dispatch(loadingAC('loading'))
        packsAPI.postPacks(pack)
            .then((res) => {
                dispatch(responseConfirmAC(true,
                    'addPack', 'Pack has been successfully added!'))
                dispatch(setPacksDataTC({
                    params: {
                        page: getState().packs.packsData.page,
                        pageCount: getState().packs.packsData.pageCount,
                        user_id: getState().packs.packsData.cardPacks[0]?.user_id // исправить ссылку на user_id
                    }
                }))
            })
            .catch((err) => {
                dispatch(responseErrorAC(true, 'addPack', err.response?.data.error))
            })
            .finally(() => {
                dispatch(loadingAC('succeeded'))
                setTimeout(() => {
                    dispatch(showAddPackAC(false))
                    dispatch(responseConfirmAC(false,
                        'addPack', ''))
                    dispatch(responseErrorAC(false, 'addPack', ''))
                }, 3000)
            })
    }

export const editPackTC = (param: PacksPutRequestType):ThunkType =>
    (dispatch, getState) => {
    dispatch(loadingAC('loading'))
    packsAPI.putPacks(param)
        .then((res) => {
            dispatch(showEditPackAC(true))
            // dispatch(editPackAC(res.data.updatedCardsPack))
            dispatch(setPacksDataTC({
                params: {
                    page: getState().packs.packsData.page,
                    pageCount: getState().packs.packsData.pageCount,
                    user_id: getState().packs.packsData.cardPacks[0]?.user_id // исправить ссылку на user_id
                }
            }))
            dispatch(responseConfirmAC(true,
                'editPack', 'Pack name has been successfully changed!'))
        })
        .catch((err) => {
            dispatch(showEditPackAC(true))
            dispatch(responseErrorAC(true, 'editPack', err.response?.data.error))
            setTimeout(() => {
            }, 3000)
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
            setTimeout(() => {
                dispatch(responseConfirmAC(false, 'editPack', ''))
                dispatch(showEditPackAC(false))
                dispatch(responseErrorAC(false, 'editPack', ''))
            }, 3000)
        })
}

export const deletePackTC = (param: PacksDeleteRequestType): ThunkType =>
    (dispatch, getState) => {

        dispatch(loadingAC('loading'))
        packsAPI.deletePacks(param)
            .then((res) => {
                dispatch(responseConfirmAC(true,
                    'deletePack', 'Pack has been successfully removed!'))
                dispatch(setPacksDataTC({
                    params: {
                        page: getState().packs.packsData.page,
                        pageCount: getState().packs.packsData.pageCount,
                        user_id: getState().packs.packsData.cardPacks[0]?.user_id // исправить ссылку на user_id
                    }
                }))
            })
            .catch((err) => {
                dispatch(responseErrorAC(true, 'deletePack', err.response?.data.error))
            })
            .finally(() => {
                dispatch(loadingAC('succeeded'))
                setTimeout(() => {
                    dispatch(showDeletePackAC(false))
                    dispatch(responseConfirmAC(false, 'deletePack', ''))
                    dispatch(responseErrorAC(false, 'deletePack', ''))
                }, 3000)
            })

    }

type SetPacksDataACType = ReturnType<typeof setPacksDataAC>
type editPackACType = ReturnType<typeof editPackAC>
type showMainPageACType = ReturnType<typeof showMainPageAC>
type showEditPackACType = ReturnType<typeof showEditPackAC>
type showAddPackACType = ReturnType<typeof showAddPackAC>
type showDeletePackACType = ReturnType<typeof showDeletePackAC>
type pickEditPackACType = ReturnType<typeof pickEditPackAC>
type pickDeletePackACType = ReturnType<typeof pickDeletePackAC>
type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>

export type PacksReducerType = SetPacksDataACType
    | LoadingACType
    | showMainPageACType
    | editPackACType
    | showEditPackACType
    | ResponseErrorACType
    | ResponseConfirmACType
    | pickEditPackACType
    | showAddPackACType
    | showDeletePackACType
    | pickDeletePackACType
    | setCurrentPageACType
