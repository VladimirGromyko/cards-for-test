import React, {useCallback, useEffect} from 'react'
import packsStyle from './PacksTable.module.css'
import SuperButton from '../../../common/c1-SuperButton/SuperButton'
import {CardPacksType} from "../../../../m3-dal/packs-api";

import {useNavigate} from "react-router-dom";
import {PATH} from "../../../routes/Paths";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";


type TableItemPropsType = {
    deletePack: (userId: string, packId: string) => void
    editPack: (userId: string, packId: string) => void
    learnPack: (packId: string) => void
    pack: CardPacksType
}

export const PackItem = ({deletePack, editPack, learnPack, pack}: TableItemPropsType) => {
    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading)


    // const navigate = useNavigate()
    // useEffect(() => {
    //     isLoading === "succeeded" && navigate(PATH.EDIT_PACK)
    // }, [isLoading, navigate])


    const onDeletePressHandler = useCallback(() => {
        deletePack(pack.user_id, pack._id)
        // dispatch()
    }, [deletePack, pack.user_id, pack._id])
    const onEditPressHandler = useCallback(() => {
        editPack(pack.user_id, pack._id)
        // dispatch()
    }, [editPack, pack.user_id, pack._id])
    // dispatch()
    const onLearnPressHandler = useCallback(() => {
        learnPack(pack._id)

        // dispatch()
    }, [learnPack, pack._id])

    return (
        <div className={packsStyle.items}>
            {/*<NavLink to={PATH.CARDS}>*/}
            {/*    {pack.name}*/}
            {/*</NavLink>*/}

            <div style={{cursor: "pointer"}} onClick={onLearnPressHandler}>{pack.name}</div>

            <div>{pack.cardsCount}</div>
            <div>{pack.created}</div>
            <div>{pack.user_id}</div>
            <div>
                <SuperButton onClick={onDeletePressHandler}>Delete</SuperButton>
                <SuperButton onClick={onEditPressHandler}>Edit</SuperButton>
                <SuperButton onClick={onLearnPressHandler}>Learn</SuperButton>
            </div>
        </div>
    )
}