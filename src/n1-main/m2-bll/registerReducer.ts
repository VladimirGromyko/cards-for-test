import {Dispatch} from "redux";
import {loadingAC} from "./loadingReducer";
import {authAPI} from "../m3-dal/auth-api";


export type stateType = {
    isRegistered: boolean
    error: string
}
const initState: stateType = {
    isRegistered: false,
    error: ''
};


export const registerReducer = (state: stateType = initState, action: RegisterActionType): stateType => {
    switch (action.type) {
        case 'IS-REGISTRED': {
            return {...state, isRegistered: action.isRegistered}
        }
        case 'SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state;
    }
};

export const setRegisteredAC = (isRegistered: boolean) => ({
    type: 'IS-REGISTRED', isRegistered
} as const);

export const setError = (error: string) => ({
    type: 'SET-ERROR', error
} as const);

export const registrationTC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(loadingAC('loading'))
    authAPI.registrationUser(email, password)
        .then(res => {
            dispatch(setRegisteredAC(true))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
        dispatch(loadingAC('succeeded'))
    })
}


type RegisterActionType = setRegistredACType | setErrorACType
type setRegistredACType = ReturnType<typeof setRegisteredAC>
type setErrorACType = ReturnType<typeof setError>