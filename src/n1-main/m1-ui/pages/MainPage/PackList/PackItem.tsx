import React, {useCallback} from 'react'
import packsStyle from './PacksTable.module.css'
import SuperButton from '../../../common/c1-SuperButton/SuperButton'
import {CardPacksType} from "../../../../m3-dal/packs-api";
import {PATH} from "../../../routes/Paths";
import {useNavigate} from "react-router-dom";
import {changeDateView} from "../../../../../n2-features/f3-utils/changeDateView";

type TableItemPropsType = {
    deletePackList: (packName: string, packId: string) => void
    editPackList: (packName: string, packId: string) => void
    learnPack: (packId: string) => void
    pack: CardPacksType
}

export const PackItem = ({deletePackList, editPackList, learnPack, pack}: TableItemPropsType) => {
    const navigate = useNavigate()
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
            <div className={packsStyle.item}
                 style={{cursor: "pointer"}}
                 onClick={() => navigate('/main/packs/' + pack._id)}
            >
                <div className={packsStyle.itemsLongName}>
                    {pack.name}
                </div>
            </div>

            <div className={packsStyle.item}>{pack.cardsCount}</div>
            <div className={packsStyle.item}>{changeDateView(pack.created)}</div>
            <div className={packsStyle.item}>{pack.user_name}</div>
            <div className={packsStyle.itemAction}>
                <SuperButton onClick={onLearnPressHandler}
                             icon="learn"
                             style={{borderWidth: 0}}
                >Learn
                </SuperButton>
                <SuperButton onClick={onEditPressHandler}
                             icon="edit"
                             style={{borderWidth: 0}}
                >Edit
                </SuperButton>
                <SuperButton icon="delete"
                             style={{borderWidth: 0}}
                             onClick={onDeletePressHandler}
                >Delete
                </SuperButton>
            </div>

        </div>
    )
}
