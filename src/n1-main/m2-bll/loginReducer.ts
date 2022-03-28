import {Dispatch} from "redux"
import {authAPI} from "../m3-dal/auth-api";
import {loadingAC, LoadingACType} from "./loadingReducer";
import {AxiosError} from "axios";

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

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
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
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

export const setAuthUserDataAC = (payload: UserDataType) => (
    {type: 'SET_USER_DATA', payload}) as const
export const setLogOutUserAC = () => (
    {type: 'LOGOUT_USER'}) as const

export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


export const getAuthUserDataTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(loadingAC('loading'))
    authAPI.login(email, password, rememberMe)
        .then(response => {
                console.log(response.data)
                dispatch(setAuthUserDataAC(response.data))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        console.log(error)
    }).finally(() => {
        dispatch(loadingAC('succeeded'))
    })
}

export const logoutUserTC = () => (dispatch: Dispatch) => {
    dispatch(loadingAC('loading'))
    authAPI.logout()
        .then(response => {
                console.log(response.data)
                dispatch(setLogOutUserAC())
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        console.log(error)
    }).finally(() => {
        dispatch(loadingAC('succeeded'))
    })
}
export const initializeMainTC = () => (dispatch: Dispatch<LoginActionsType>) => {
    dispatch(loadingAC('loading'))
    authAPI.me()
        .then((res) => {
            // if (res.data.resultCode === 0) {
            //     // dispatch(setAppStatusAC('succeeded'))
            // dispatch(setIsLoggedInAC(true))
            dispatch(setAuthUserDataAC(res.data))
            console.log(res.data)
            //
            // } else {
            //     handleServerAppError(dispatch, res.data)
            // }
        })
        .catch((err: AxiosError) => {
            console.log(err.response)
            // handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
            // dispatch(setIsInitializedAC(true))
        })
}


export type setAuthUserDataType = ReturnType<typeof setAuthUserDataAC>
export type setLogOutDataType = ReturnType<typeof setLogOutUserAC>
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type LoginActionsType =
    | setAuthUserDataType
    | setLogOutDataType
    | LoadingACType
    | setIsLoggedInACType