import React from 'react'
import s from '../PackList/Cards/CardsTable.module.css'
import {CardType} from "../../../../m2-bll/cardsReducer1";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {useSelector} from 'react-redux';
import {AppStoreType} from '../../../../m2-bll/store';
import {UserDataType} from '../../../../m2-bll/loginReducer';
import {changeDateView} from "../../../../../n2-features/f3-utils/changeDateView";
import {DeleteCardModal} from "../../../../../n2-features/f2-modals/DeleteCardModal";
import {EditCardModal} from "../../../../../n2-features/f2-modals/EditCardModal";

type CardItemPropsType = {
    card: CardType
    show: boolean
    setShow: (value: boolean) => void
    editShow:boolean
    setEditShow: (value: boolean) => void
}

export const CardItem = ({show, setShow, card ,editShow, setEditShow}: CardItemPropsType) => {
    const user = useSelector<AppStoreType, UserDataType | null>(state => state.login.user)

    return (
        <div className={s.items}>
            <div>{card.question}</div>
            <div>{card.answer}</div>
            <div>{changeDateView(card.updated)}</div>
            <div>{card.grade}</div>
            <div>
                {card.user_id === user?._id && <DeleteCardModal show={show} setShow={setShow} cardId={card._id}/>}
                {card.user_id === user?._id && <EditCardModal show={editShow} setShow={setEditShow} cardId={card._id} />}
            </div>
        </div>
    )
}