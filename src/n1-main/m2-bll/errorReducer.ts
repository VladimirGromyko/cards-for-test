export type PageOfResponse = 'changePas' | 'passwordRec' | 'setPacks'
    | 'editPack' | 'addPack' | 'deletePack' |''

const initState = {
    isResponseError: false,
    pageOfError: '' as PageOfResponse,
    errorMessage: ''
}
export type ResponseErrorStateType = typeof initState

export const errorReducer = (state = initState,
                             action: ResponseErrorACType): ResponseErrorStateType => {
    switch (action.type) {
        case "RESPONSE-ERROR": {
            return {
                ...state, isResponseError: action.isResponseError,
                pageOfError: action.pageOfError,
                errorMessage: action.errorMessage
            }
        }
        default:
            return state
    }
}

export const responseErrorAC = (isResponseError: boolean,
                                pageOfError: PageOfResponse,
                                errorMessage: string) =>
    ({type: 'RESPONSE-ERROR', isResponseError, pageOfError, errorMessage} as const)

export type ResponseErrorACType = ReturnType<typeof responseErrorAC>