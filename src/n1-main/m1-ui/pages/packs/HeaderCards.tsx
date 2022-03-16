import s from '../packs/HeaderCards.module.css'
import React from 'react'
import { SortNameType, SortNumberType } from '../../../m3-dal/cards-api'
import { useParams } from 'react-router-dom'
import { CardsTablePropsType } from './CardsTable'

export const HeaderCards = ({ getCards, packId, ...props }: CardsTablePropsType) => {


    const sortCards = (sortNumber?: SortNumberType, sortName?: SortNameType) => {
        if (packId) {
            getCards(packId, sortNumber, sortName)
        }
    }

    return (
        <div className={s.wrapper_header}>
            <div className={s.wrapper_header_table}>
                <div className={s.header_tableItem}>Question
                    <button 
                        className={s.button}
                        onClick={() => sortCards(1, 'question')}>
                            <div className={s.triangle_up}></div>
                            </button>
                    <button
                        className={s.button}
                        onClick={() => sortCards(0, 'question')}>
                            <div className={s.triangle_down}></div>
                            </button>
                            
                </div>
                <div className={s.header_tableItem}>Answer
                    <button 
                        className={s.button}
                        onClick={() => sortCards(1, 'answer')}>
                            <div className={s.triangle_up}></div></button>
                    <button 
                        className={s.button}
                        onClick={() => sortCards(0, 'answer')}>
                            <div className={s.triangle_down}></div></button>
                </div>
                <div className={s.header_tableItem}>Updated
                    <button 
                        className={s.button}
                        onClick={() => sortCards(1, 'updated')}>
                            <div className={s.triangle_up}></div></button>
                    <button 
                        className={s.button}
                        onClick={() => sortCards(0, 'updated')}>
                            <div className={s.triangle_down}></div></button>
                </div>
                <div className={s.header_tableItem}>Grade
                    <button 
                        className={s.button}
                        onClick={() => sortCards(1, 'grade')}>
                            <div className={s.triangle_up}></div></button>
                    <button 
                        className={s.button}
                        onClick={() => sortCards(0, 'grade')}>
                            <div className={s.triangle_down}></div></button>
                </div>
            </div>
        </div>
    )
}