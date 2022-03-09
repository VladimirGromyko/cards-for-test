import { Dispatch } from "redux"
import {authAPI} from "./api-login";

type InitialStateType = {
    user: UserDataType | {},
    isLoggedIn: boolean
}

const initialState = {
    user: {},
    isLoggedIn: false
}

export type UserDataType = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number,

    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            debugger
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case 'LOGOUT_USER':
            debugger
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }

        default:
            return state
    }
}

export const setAuthUserDataAC = (payload: InitialStateType) => (
    {type: 'SET_USER_DATA', payload}) as const
export const setLogOutUserAC = () => (
    {type: 'LOGOUT_USER'}) as const


export const getAuthUserDataTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    debugger
    authAPI.login(email, password, rememberMe)
        .then(response => {
                console.log(response.data)
                debugger
                dispatch(setAuthUserDataAC(response.data))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error:(e.message+", more details in the console")
        debugger
        console.log(error)
    })
}

export const logoutUserTC = () => (dispatch: Dispatch) => {
    debugger
    authAPI.logout()
        .then(response => {
                console.log(response.data)
                debugger
                dispatch(setLogOutUserAC())
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error:(e.message+", more details in the console")
        debugger
        console.log(error)
    })
}

export type setAuthUserDataType = ReturnType<typeof setAuthUserDataAC>
export type setLogOutDataType = ReturnType<typeof setLogOutUserAC>
type ActionsType =
    | setAuthUserDataType
    | setLogOutDataType