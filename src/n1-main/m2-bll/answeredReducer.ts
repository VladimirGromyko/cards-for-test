import {PageOfResponse} from "./errorReducer";

const initState = {
    isResponseConfirm: false,
    pageOfConfirm: '' as PageOfResponse,
    confirmMessage: ''
}
export type ResponseConfirmStateType = typeof initState

export const answeredReducer = (state = initState,
                             action: ResponseConfirmACType): ResponseConfirmStateType => {
    switch (action.type) {
        case "RESPONSE-CONFIRM": {
            return {
                ...state, isResponseConfirm: action.isResponseConfirm,
                pageOfConfirm: action.pageOfConfirm,
                confirmMessage: action.confirmMessage
            }
        }
        default:
            return state
    }
}

export const responseConfirmAC = (isResponseConfirm: boolean,
                                pageOfConfirm: PageOfResponse,
                                confirmMessage: string) =>
    ({type: 'RESPONSE-CONFIRM', isResponseConfirm, pageOfConfirm, confirmMessage} as const)

export type ResponseConfirmACType = ReturnType<typeof responseConfirmAC>