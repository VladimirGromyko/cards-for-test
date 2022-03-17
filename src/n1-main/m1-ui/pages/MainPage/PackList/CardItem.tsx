import React from 'react'
import s from '../PackList/Cards/CardsTable.module.css'
import {CardType} from "../../../../m2-bll/cardsReducer1";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";

type CardItemPropsType = {
    card: CardType
    onClickDeleteCards:(cardId: string) => void
}

export const CardItem  = ({onClickDeleteCards, card}:CardItemPropsType) => {
    return (
        <div className={s.items}>
                        <div>{card.question}</div>
                        <div>{card.answer}</div>
                        <div>{card.updated}</div>
                        <div>{card.grade}</div>
                        <SuperButton onClick={() => onClickDeleteCards(card._id)}>delete card</SuperButton>
                    </div>
    )
}