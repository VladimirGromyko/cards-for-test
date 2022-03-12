import {Dispatch} from "redux";
import {loadingAC, LoadingACType} from "./loadingReducer";
import {packsAPI, PacksDataType, PacksRequestType} from "../m3-dal/packs-api";

export type statePacksType = {
    packsData: PacksDataType
}

const initState = {} as statePacksType

export const packsReducer = (state: statePacksType = initState,
                             action: PacksReducerType): statePacksType => {
    switch (action.type) {
        case "SET_PACKS_DATA": {
            return {...state, packsData: action.packsData}
        }
        default:
            return state;
    }
};

export const setPacksDataAC = (packsData: PacksDataType) => (
    {type: 'SET_PACKS_DATA', packsData}) as const

export const setPacksDataTC = (packsRequest: PacksRequestType) => (dispatch: Dispatch<PacksReducerType>) => {
    dispatch(loadingAC('loading'))
    packsAPI.setPacks(packsRequest)
        .then((res) =>{
            console.log(res.data)
            dispatch(setPacksDataAC(res.data))
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            dispatch(loadingAC('succeeded'))
        })

}

type SetPacksDataACType = ReturnType<typeof setPacksDataAC>

export type PacksReducerType = SetPacksDataACType
    | LoadingACType