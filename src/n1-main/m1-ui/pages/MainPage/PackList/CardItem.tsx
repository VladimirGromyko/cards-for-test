import React from 'react'
import s from '../PackList/Cards/CardsTable.module.css'
import {CardType} from "../../../../m2-bll/cardsReducer1";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import { useSelector } from 'react-redux';
import { AppStoreType } from '../../../../m2-bll/store';
import { UserDataType } from '../../../../m2-bll/loginReducer';

type CardItemPropsType = {
    card: CardType
    onClickDeleteCards:(cardId: string) => void
}

export const CardItem  = ({onClickDeleteCards, card}:CardItemPropsType) => {
    const user = useSelector<AppStoreType,UserDataType | null>(state => state.login.user)

    return (
        <div className={s.items}>
                        <div>{card.question}</div>
                        <div>{card.answer}</div>
                        <div>{card.updated}</div>
                        <div>{card.grade}</div>
                        {card.user_id === user?._id && <SuperButton onClick={() => onClickDeleteCards(card._id)}>delete card</SuperButton>}
                    </div>
    )
}