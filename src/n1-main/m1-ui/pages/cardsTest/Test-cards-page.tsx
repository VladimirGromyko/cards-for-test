import {cardsAPI} from "../../../m3-dal/cards-api";
import {Route, Routes, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {CardType, getAllCardAC, getPackUserIdAC} from "../../../m2-bll/cardsReducer1";

export const TestCardPage = () => {
    const cardsIsGot = useSelector<AppStoreType, CardType[]>(state => state.cards1.cards)
    const packUserId = useSelector<AppStoreType>(state => state.cards1.packUserId)
    const dispatch = useDispatch()

    const params = useParams()
    const cardId = params.id

    useEffect(()=> {
        if (cardId){
            cardsAPI.getAllCards(cardId, '1000').then(res=> {
                dispatch(getAllCardAC(res.data.cards))
                dispatch(getPackUserIdAC(res.data.packUserId))
            })
        }
    }, [])

    const onClickGetCards = ()=> {
        if (cardId){
            cardsAPI.getAllCards(cardId, '1000').then(res=> {
                dispatch(getAllCardAC(res.data.cards))
            })
        }

    }
    const onClickAddCards = ()=> {
        debugger
            if (cardId){
            cardsAPI.addCard(cardId, 'why', 'yes').then(res=> {
                debugger
            }
            )}
    }

    return (
        <div>
            <h2>Card</h2>
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
                </div>
            })}
            <button onClick={onClickGetCards}>get card</button>
            <button onClick={onClickAddCards}>add card</button>
            <button onClick={onClickGetCards}>delete card</button>
            </div>


    )
}
