import React, {ChangeEvent, useEffect, useState} from 'react'
import cardsStyle from '../packs/cardsTable.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {CardType, getAllCardAC} from "../../../m2-bll/cardsReducer1";
import {useParams} from "react-router-dom";
import {cardsAPI} from "../../../m3-dal/cards-api";
import packsStyle from "./PacksTable.module.css";
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";


const CardsTable = () => {

    const cardsIsGot = useSelector<AppStoreType, CardType[]>(state => state.cards1.cards)
    const dispatch = useDispatch()

    const [quest, setQuest] = useState('')
    const [answer, setAnswerer] = useState('')

    const params = useParams()
    const packId = params.id

    const getCards = () => {
        if (packId) {
            cardsAPI.getAllCards(packId, '1000').then(res => {
                dispatch(getAllCardAC(res.data.cards))
            })
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
                    return <div className={packsStyle.items}>
                        <div>{card.question}</div>
                        <div>{card.answer}</div>
                        <div>{card.updated}</div>
                        <div>{card.grade}</div>
                        <SuperButton onClick={() => onClickDeleteCards(card._id)}>delete card</SuperButton>
                    </div>
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