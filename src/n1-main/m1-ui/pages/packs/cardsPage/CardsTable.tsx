import React, {useEffect} from 'react'
import cardsStyle from './cardsTable.module.css'
import {AppStoreType} from "../../../../m2-bll/store";
import {fetchCardsTC} from "../../../../m2-bll/cardsReducer";
import {useDispatch, useSelector} from "react-redux";


const CardsTable = () => {

    const cards = useSelector((state: AppStoreType) => state.cards.cards)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardsTC('5eb6a2f72f849402d46c6ac7'));
    }, []);

    return (
        <div className={cardsStyle.container}>
            {
                cards.map((c) => {
                    <div className={cardsStyle.items}>
                        <div>{c.question}</div>
                        <div>{c.answer}</div>
                        <div>{c.updated}</div>
                        <div>{c.grade}</div>
                    </div>
                })
            }
        </div>
    );
};

export default CardsTable;