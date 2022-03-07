import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/auth-api";

export type SendForgotPassStatusType = 'succeeded' | 'failed'

export type authStateType = {
    isInstructionEmailed: SendForgotPassStatusType
}
const initState: authStateType = {
    isInstructionEmailed: 'failed'
};


export const authReducer = (state: authStateType = initState,
                            action: authReducerType): authStateType => {
    switch (action.type) {
        case "AUTH/FORGOT-PASS-STATUS": {
            return {...state, isInstructionEmailed: action.status}
        }
        default:
            return state;
    }
};

export const forgotTC = (name: string) => (dispatch: Dispatch<authReducerType>) => {
    // dispatch(setAppStatusAC('loading'))
    authAPI.recoverPass(name)
        .then((res) => {
            console.log("name :", name)

            if (res.data.error) {
                console.log(res.data.error)
            } else {
                dispatch(setForgotPassStatusAC('succeeded'))
                console.log(res)
            }
            //     if (res.data.resultCode === 0) {
            //
            //         // dispatch(setAppStatusAC('succeeded'))
            //         // dispatch(setIsLoggedInAC(false))
            //         // dispatch(clearTodosDataAC())
            //     } else {
            //         handleServerAppError(dispatch, res.data)
            //     }
            // })
            // .catch((err: AxiosError) => {
            //     handleServerNetworkError(dispatch, err.message)
        })
        .catch(err => {
            console.log(err.error)
        })
}
export const setForgotPassStatusAC = (status: SendForgotPassStatusType) =>
    ({type: 'AUTH/FORGOT-PASS-STATUS', status} as const)

export type SetForgotPassACType = ReturnType<typeof setForgotPassStatusAC>

export type authReducerType = SetForgotPassACType


