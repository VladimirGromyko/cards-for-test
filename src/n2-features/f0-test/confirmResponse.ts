import {ResponseConfirmStateType} from "../../n1-main/m2-bll/answeredReducer";

export const confirmResponse = (confirmRes:ResponseConfirmStateType, pageOfConfirm:string):string => {
    const confirmString = confirmRes.isResponseConfirm && confirmRes.pageOfConfirm === pageOfConfirm
        ? confirmRes.confirmMessage
        : ''
  return confirmString
}
