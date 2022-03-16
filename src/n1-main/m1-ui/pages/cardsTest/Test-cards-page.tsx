import {cardsAPI} from "../../../m3-dal/cards-api";
import {Route, Routes, useParams} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {addCardAC, CardType, deleteCardAC, getAllCardAC} from "../../../m2-bll/cardsReducer1";
import SuperButton from "../../common/c1-SuperButton/SuperButton";

export const TestCardPage = () => {
    const cardsIsGot = useSelector<AppStoreType, CardType[]>(state => state.cards1.cards)
    const dispatch = useDispatch()

    const [quest, setQuest] = useState('')
    const [answer, setAnswerer] = useState('')

    const params = useParams()
    const packId = params.id

    const getCards = () => {
        if (packId){
            cardsAPI.getAllCards(packId, '1000').then(res=> {
                dispatch(getAllCardAC(res.data.cards))
            })
        }
    }

    useEffect(()=> {
        getCards()
    }, [])

    const onClickGetCards = () => {
        getCards()

    }
    const onClickAddCards = ()=> {
            if (packId){
            cardsAPI.addCard(packId, quest, answer).then(res=> {
                // dispatch(addCardAC(res.data.newCard))
                    getCards()
            }
            )}
    }

    const onClickDeleteCards = (cardId: string)=> {
        if (cardId){
            cardsAPI.deleteCard(cardId).then(res=>{
                // dispatch(deleteCardAC(cardId))
                getCards()
            })
        }
}


    const onQuestionInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setQuest(e.currentTarget.value)
    }
    const onAnswerInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setAnswerer(e.currentTarget.value)
    }

    return (
        <div>
            <h2>Pack name</h2>
            <span style={{margin:'10px'}}>question</span>
            <span style={{margin:'10px'}}>answer</span>
            <span style={{margin:'10px'}}>updated</span>
            <span style={{margin:'10px'}}>grade</span>
            {cardsIsGot.map( card => {
                return <div>
                    <span style={{margin:'10px'}}>{card.question}</span>
                    <span style={{margin:'10px'}}>{card.answer}</span>
                    <span style={{margin:'10px'}}>{card.updated}</span>
                    <span style={{margin:'10px'}}>{card.grade}</span>
                    <SuperButton onClick={()=> onClickDeleteCards(card._id)}>delete card</SuperButton>
                </div>
            })}
            <input type='text' onChange={onQuestionInputChange}/>
            <input type='text' onChange={onAnswerInputChange}/>
            <SuperButton onClick={onClickGetCards}>get card</SuperButton>
            <SuperButton onClick={onClickAddCards}>add card</SuperButton>
            </div>


    )
}
