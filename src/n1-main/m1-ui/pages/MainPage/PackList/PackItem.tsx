import React, {useCallback, useEffect} from 'react'
import packsStyle from './PacksTable.module.css'
import SuperButton from '../../../common/c1-SuperButton/SuperButton'
import {CardPacksType} from "../../../../m3-dal/packs-api";

type TableItemPropsType = {
    deletePack: (userId: string, packId: string) => void
    pickEditPack: (packName: string, packId: string) => void
    learnPack: (packId: string) => void
    pack: CardPacksType
}

export const PackItem = ({deletePack, pickEditPack, learnPack, pack}: TableItemPropsType) => {

    const onDeletePressHandler = useCallback(() => {
        deletePack(pack.user_id, pack._id)
    }, [deletePack, pack.user_id, pack._id])

    const onEditPressHandler = useCallback(() => {
        pickEditPack(pack.name, pack._id)
    }, [pickEditPack, pack.name, pack._id])

    const onLearnPressHandler = useCallback(() => {
        learnPack(pack._id)
    }, [learnPack, pack._id])

    return (
        <div className={packsStyle.items}>
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