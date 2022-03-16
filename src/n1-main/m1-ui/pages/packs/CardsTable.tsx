import React, {ChangeEvent, useEffect, useState} from 'react'
import cardsStyle from '../packs/CardsTable.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {CardType, getAllCardAC} from "../../../m2-bll/cardsReducer1";
import {useParams} from "react-router-dom";
import {cardsAPI, SortNameType, SortNumberType} from "../../../m3-dal/cards-api";
import packsStyle from "./PacksTable.module.css";
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import { CardItem } from './CardItem';

export type CardsTablePropsType = {
    getCards: (packId:string, sortNumber?:SortNumberType, sortName?: SortNameType)=> void
    packId:string | undefined
}


const CardsTable = ({packId, ...props}: CardsTablePropsType) => {

    const cardsIsGot = useSelector<AppStoreType, CardType[]>(state => state.cards1.cards)
    const dispatch = useDispatch()

    const [quest, setQuest] = useState('')
    const [answer, setAnswerer] = useState('')

    const getCards = (sortNumber?:SortNumberType, sortName?: SortNameType) => {
        if (packId) {
            props.getCards(packId, sortNumber, sortName)
        }
    }

    useEffect(() => {
        getCards()
    }, [])

    const onClickGetCards = () => {
        getCards()
    }
    const onClickAddCards = () => {
        if (packId) {
            cardsAPI.addCard(packId, quest, answer).then(res => {
                    getCards()
                }
            )
        }
    }

    const onClickDeleteCards = (cardId: string) => {
            cardsAPI.deleteCard(cardId).then(res => {
                getCards()
            })
    }


    const onQuestionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuest(e.currentTarget.value)
    }
    const onAnswerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerer(e.currentTarget.value)
    }


    return (
        <div className={cardsStyle.container}>
            {
                cardsIsGot.map(card => {
                    return <CardItem card={card} 
                    onClickDeleteCards={onClickDeleteCards}/>
                })
            }
            <SuperInputText type='text' onChange={onQuestionInputChange}/>
            <SuperInputText type='text' onChange={onAnswerInputChange}/>
            <SuperButton onClick={onClickGetCards}>get card</SuperButton>
            <SuperButton onClick={onClickAddCards}>add card</SuperButton>
        </div>
    );
};

export default CardsTable;