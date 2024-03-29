import React, {useCallback, useState} from 'react'
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";
import s from '../../p3-pass-recovery/PassRecovery.module.css';
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
import l from "../../../common/c7-Loading/loader07.module.css";
import {LoadingStatusType} from '../../../../m2-bll/loadingReducer';
import {ResponseConfirmStateType} from "../../../../m2-bll/answeredReducer";
import {confirmResponse} from "../../../../../n2-features/f0-test/confirmResponse";


type EditPackType = {
    editPack: (packId: string, namePack: string) => void
    editPackId: string
    editPackName: string
    isLoading: LoadingStatusType
    setFalse: () => void
}

const EditPack = ({
                      editPack, editPackId, editPackName,
                      // hideEditPack,
                      isLoading,
                      setFalse
                  }: EditPackType) => {
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const confirmRes = useSelector<AppStoreType, ResponseConfirmStateType>(state => state.confirm)

    const [newPackName, setNewPackName] = useState<string>('')

    const onKeyPressHandler = useCallback(() => {
        let trimNewPackName = newPackName.trim()
        editPack(editPackId, trimNewPackName)
    }, [editPack, editPackId, newPackName])

    const OnCancelClick = useCallback(() => {
        setFalse()
    }, [setFalse])

    return (
        <div className={s.wrapper}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <h3>Packs info</h3>
            <div>
                Edit name of pack {editPackName}?
            </div>
            <br/>
            <SuperInputText value={newPackName}
                            onChangeText={setNewPackName}
                            onEnter={onKeyPressHandler}
                            placeholder={editPackName}
                            error={errorResponse(errorRes, 'editPack')}
                            spanClassName={s.inputError}
            />
            <SuperButton onClick={onKeyPressHandler}>Save</SuperButton>
            <SuperButton onClick={OnCancelClick}>Cancel</SuperButton>

            {confirmRes.isResponseConfirm && <div style={{color: 'blue'}}>
                {confirmResponse(confirmRes, 'editPack')}
            </div>}
            {/*{errorRes.isResponseError && <div style={{color: 'red'}}>*/}
            {/*    {errorResponse(errorRes, 'editPack')}*/}
            {/*</div>}*/}
        </div>
    )
}

export default EditPack
