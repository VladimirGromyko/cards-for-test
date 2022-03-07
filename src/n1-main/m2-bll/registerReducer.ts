
import { type } from "os";
import { Dispatch } from "redux";
import { registerAPI } from "../m3-dal/registerAPI";


export type stateType = {
    isRegistred: boolean
    error: string
}
const initState: stateType = {
    isRegistred: false,
    error: ''
};


export const registerReducer = (state: stateType = initState, action: RegisterActionType): stateType => {
    switch (action.type) {
        case 'IS-REGISTRED': {
            return { ...state, isRegistred: action.isRegistred }
        }
        case 'SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state;
    }
};

export const setRegistredAC = (isRegistred: boolean) => ({
    type: 'IS-REGISTRED', isRegistred
} as const);

export const setError = (error: string) => ({
    type: 'SET-ERROR', error
} as const);

export const registrationTC = (email: string, password: string) => (dispatch: Dispatch) => {
        debugger
        registerAPI.registrationUser(email, password)
            .then(res => {
                debugger
                dispatch(setRegistredAC(true))
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setError(error))
            })
    }


type RegisterActionType = setRegistredACType | setErrorACType
type setRegistredACType = ReturnType<typeof setRegistredAC>
type setErrorACType = ReturnType<typeof setError>