import { Dispatch } from "redux"
import {authAPI} from "../m3-dal/auth-api";

type InitialStateType = {
    user: UserDataType | null,
    isLoggedIn: boolean
}

const initialState = {
    user: null,
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
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                user: null,
                isLoggedIn: false
            }

        default:
            return state
    }
}

export const setAuthUserDataAC = (payload: UserDataType) => (
    {type: 'SET_USER_DATA', payload}) as const
export const setLogOutUserAC = () => (
    {type: 'LOGOUT_USER'}) as const


export const getAuthUserDataTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
                console.log(response.data)
                dispatch(setAuthUserDataAC(response.data))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error:(e.message+", more details in the console")
        console.log(error)
    })
}

export const logoutUserTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
                console.log(response.data)
                dispatch(setLogOutUserAC())
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error:(e.message+", more details in the console")
        console.log(error)
    })
}

export type setAuthUserDataType = ReturnType<typeof setAuthUserDataAC>
export type setLogOutDataType = ReturnType<typeof setLogOutUserAC>
type ActionsType =
    | setAuthUserDataType
    | setLogOutDataType