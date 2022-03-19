import React, {useCallback} from 'react'
import packsStyle from './PacksTable.module.css'
import SuperButton from '../../../common/c1-SuperButton/SuperButton'
import {CardPacksType} from "../../../../m3-dal/packs-api";

type TableItemPropsType = {
    deletePackList: (packName: string, packId: string) => void
    editPackList: (packName: string, packId: string) => void
    learnPack: (packId: string) => void
    pack: CardPacksType
}

export const PackItem = ({deletePackList, editPackList, learnPack, pack}: TableItemPropsType) => {

    const onDeletePressHandler = useCallback(() => {
        deletePackList(pack.name, pack._id)
    }, [deletePackList, pack.name, pack._id])

    const onEditPressHandler = useCallback(() => {
        editPackList(pack.name, pack._id)
    }, [editPackList, pack.name, pack._id])

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