import {cardsAPI} from "../../../m3-dal/cards-api";
import {Route, Routes, useParams} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {addCardAC, CardType, deleteCardAC, getAllCardAC, getPackUserIdAC} from "../../../m2-bll/cardsReducer1";

export const TestCardPage = () => {
    const cardsIsGot = useSelector<AppStoreType, CardType[]>(state => state.cards1.cards)
    const dispatch = useDispatch()

    const [quest, setQuest] = useState('')
    const [answ, setAnsw] = useState('')

    const params = useParams()
    const packId = params.id

    useEffect(()=> {
        if (packId){
            cardsAPI.getAllCards(packId, '1000').then(res=> {
                dispatch(getAllCardAC(res.data.cards))
                dispatch(getPackUserIdAC(res.data.packUserId))
            })
        }
    }, [])

    const onClickGetCards = ()=> {
        if (packId){
            cardsAPI.getAllCards(packId, '1000').then(res=> {
                dispatch(getAllCardAC(res.data.cards))
            })
        }

    }
    const onClickAddCards = ()=> {
            if (packId){
            cardsAPI.addCard(packId, quest, answ).then(res=> {
                // dispatch(addCardAC(res.data.newCard))
                if (packId){
                    cardsAPI.getAllCards(packId, '1000').then(res=> {
                        dispatch(getAllCardAC(res.data.cards))
                    })
                }
            }
            )}
    }

    const onClickDeleteCards = (cardId: string)=> {
        if (cardId){
            cardsAPI.deleteCard(cardId).then(res=>{
                // dispatch(deleteCardAC(cardId))
                if (packId){
                    cardsAPI.getAllCards(packId, '1000').then(res=> {
                        dispatch(getAllCardAC(res.data.cards))
                    })
                }
            })
        }
}


    const onQuestionInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setQuest(e.currentTarget.value)
    }
    const onAnswerInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setAnsw(e.currentTarget.value)
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
                    <button onClick={()=> onClickDeleteCards(card._id)}>delete card</button>
                </div>
            })}
            <input type='text' onChange={onQuestionInputChange}/>
            <input type='text' onChange={onAnswerInputChange}/>
            <button onClick={onClickGetCards}>get card</button>
            <button onClick={onClickAddCards}>add card</button>    
            </div>


    )
}
