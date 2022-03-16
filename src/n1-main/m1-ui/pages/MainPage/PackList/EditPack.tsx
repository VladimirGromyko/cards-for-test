import React, {useCallback, useState} from 'react'
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";
import s from '../../p3-pass-recovery/PassRecovery.module.css';
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
import l from "../../../common/c7-Loading/loader07.module.css";
import {LoadingStatusType} from "../../../../m2-bll/loadingReducer";
import {editPackTC} from "../../../../m2-bll/packsReducer";

type EditPackType = {
    editPack: (packId: string, namePack: string) => void
    packId: string
    packName:string
    hideEditPack : () => void
}

const EditPack = ({editPack, packId, packName, hideEditPack}: EditPackType) => {
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)

    const [newPackName, setNewPackName] = useState<string>('')

    const onKeyPressHandler = useCallback(() => {
        editPack(packId, newPackName)
    }, [editPackTC, packId])

    const OnCancelClick = useCallback(() => {
        hideEditPack()
    }, [hideEditPack])

    return (
        <div className={s.wrapper}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <h3>Packs info</h3>
            <div>
                Edit name of pack {packName}?
            </div>
            <br/>
            <SuperInputText value={newPackName}
                            onChangeText={setNewPackName}
                            onEnter={onKeyPressHandler}
                            placeholder={'Enter new pack name'}
                            error={errorResponse(errorRes, 'editPack')}
                            spanClassName={s.inputError}
            />
            <SuperButton onClick={OnCancelClick}>Cancel</SuperButton>
            <SuperButton onClick={onKeyPressHandler}>Save</SuperButton>
        </div>
    )
}

export default EditPack
