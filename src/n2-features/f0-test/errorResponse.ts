import {ResponseErrorStateType} from "../../n1-main/m2-bll/errorReducer";

export const errorResponse = (errorRes:ResponseErrorStateType, pageOfError:string):string => {
    const errorString = errorRes.isResponseError && errorRes.pageOfError === pageOfError
        ? 'Error: ' + errorRes.errorMessage
        : ''
  return errorString
}
