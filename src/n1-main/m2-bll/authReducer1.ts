import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/auth-api";
import {loadingAC, LoadingACType} from "./loadingReducer";
import {responseErrorAC, ResponseErrorACType} from "./errorReducer";

export type SendForgotPassStatusType = 'succeeded' | 'failed'

export type authStateType = {
    isInstructionEmailed: SendForgotPassStatusType
    isNewPassSet: SendForgotPassStatusType
}
const initState: authStateType = {
    isInstructionEmailed: 'failed',
    isNewPassSet: 'failed',
};


export const authReducer1 = (state: authStateType = initState,
                             action: authReducerType): authStateType => {
    switch (action.type) {
        case "AUTH/FORGOT-PASS-STATUS": {
            return {...state, isInstructionEmailed: action.status}
        }
        case "AUTH/NEW-PASS-STATUS": {
            return {...state, isNewPassSet: action.status}
        }
        default:
            return state;
    }
};

export const forgotTC = (name: string) => (dispatch: Dispatch<authReducerType>) => {
    dispatch(loadingAC('loading'))
    authAPI.recoverPass(name)
        .then((res) => {
            dispatch(setForgotPassStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            dispatch(responseErrorAC(true, 'passwordRec', err.response?.data.error))
        })
        .finally(() => {
            dispatch(loadingAC('succeeded'))
        })
}

export const resetNewPasswordTC = (password: string, resetPasswordToken: string | undefined) =>
    (dispatch: Dispatch<authReducerType>) => {
        dispatch(loadingAC('loading'))
        authAPI.setNewPass(password, resetPasswordToken)
            .then((res) => {
                dispatch(resetNewPassStatusAC('succeeded'))
            })
            .catch((err: AxiosError) => {
                dispatch(responseErrorAC(true, 'changePas', err.response?.data.error))
            })
            .finally(() => {
                dispatch(loadingAC('succeeded'))
            })
    }

export const setForgotPassStatusAC = (status: SendForgotPassStatusType) =>
    ({type: 'AUTH/FORGOT-PASS-STATUS', status} as const)

export const resetNewPassStatusAC = (status: SendForgotPassStatusType) =>
    ({type: 'AUTH/NEW-PASS-STATUS', status} as const)

export type SetForgotPassACType = ReturnType<typeof setForgotPassStatusAC>
export type ResetNewPassACType = ReturnType<typeof resetNewPassStatusAC>

export type authReducerType = SetForgotPassACType
    | ResetNewPassACType
    | LoadingACType
    | ResponseErrorACType


