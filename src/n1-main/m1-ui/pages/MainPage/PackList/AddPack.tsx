import s from "../../p3-pass-recovery/PassRecovery.module.css";
import l from "../../../common/c7-Loading/loader07.module.css";
import React, {useCallback, useState} from "react";
import {LoadingStatusType} from "../../../../m2-bll/loadingReducer";
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {ResponseConfirmStateType} from "../../../../m2-bll/answeredReducer";
import {confirmResponse} from "../../../../../n2-features/f0-test/confirmResponse";
import ModalAddContainer from "../../../../../n2-features/f3-utils/Modal/ModalAddContainer";


type AddPackType = {
    addPack: (pack: string) => void
    // hideAddPack: () => void
    // hideAddPack: () => void
    isLoading: LoadingStatusType,
    setFalse: () => void
}
export const AddPack = ({addPack, isLoading, setFalse}: AddPackType) => {
// export const AddPack = ({addPack, hideAddPack, isLoading}: AddPackType) => {

    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const confirmRes = useSelector<AppStoreType, ResponseConfirmStateType>(state => state.confirm)

    const [newPack, setNewPack] = useState<string>('')

    const onSaveClick = useCallback(() => {
        let trimNewPack = newPack.trim()
        addPack(trimNewPack)
    }, [addPack, newPack])


    const OnCancelClick = useCallback(() => {
        setFalse()
    }, [setFalse])
    // const OnCancelClick = useCallback(() => {
    //     hideAddPack()
    // }, [hideAddPack])


    return (
        <div className={s.wrapper}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <div>Add pack element</div>
            <div>Name pack</div>

            <SuperInputText value={newPack}
                            onChangeText={setNewPack}
                            onEnter={onSaveClick}
                            placeholder={'New pack'}
                            error={errorResponse(errorRes, 'addPack')}
                            spanClassName={s.inputError}
            />
            <SuperButton onClick={OnCancelClick}>Cancel</SuperButton>
            <SuperButton onClick={onSaveClick}>Save</SuperButton>
            {confirmRes.isResponseConfirm && <div style={{color: 'blue'}}>
                {confirmResponse(confirmRes, 'addPack')}
            </div>}
            {/*{errorRes.isResponseError && <div style={{color: 'red'}}>*/}
            {/*    {errorResponse(errorRes, 'addPack')}*/}
            {/*</div>}*/}
        </div>
    )
}