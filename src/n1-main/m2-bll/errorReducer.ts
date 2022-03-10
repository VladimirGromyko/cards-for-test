const initState = {
    isResponseError: false,
    errorMessage: ''
}
export type ResponseErrorStateType = typeof initState

export const errorReducer = (state = initState,
                               action: ResponseErrorACType): ResponseErrorStateType => {
    switch (action.type) {
        case "RESPONSE-ERROR": {
            return {...state, isResponseError: action.isResponseError, errorMessage: action.errorMessage}
        }
        default:
            return state
    }
}

export const responseErrorAC = (isResponseError: boolean, errorMessage: string) => ({
    type: 'RESPONSE-ERROR', isResponseError, errorMessage} as const)

export type ResponseErrorACType = ReturnType<typeof responseErrorAC>