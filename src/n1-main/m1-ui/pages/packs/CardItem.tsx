import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './СardsTable.module.css'
import SuperButton from '../../common/c1-SuperButton/SuperButton'
import {PATH} from '../../routes/Paths'
import {CardPacksType} from "../../../m3-dal/packs-api";
import {CardType} from "../../../m2-bll/cardsReducer1"


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