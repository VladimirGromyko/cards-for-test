import React from "react";
import s from "./CardsChanger.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {changeCardAC, stateCardsType} from "../../../m2-bll/cardsReducer";
import SuperButton from "../c1-SuperButton/SuperButton";

export const cardsArray: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

function CardsChanger() {
    const card = useSelector<AppStoreType, stateCardsType>(state => state.cards)
    const dispatch = useDispatch()

    function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const onClickHandler = () => {
        let cardIndex = getRandomIntInclusive(0, cardsArray.length - 1)
        dispatch(changeCardAC(cardsArray[cardIndex]))
    }
    return (

        <div>
            <div className={s.changeCard}>
                <SuperButton onClick={onClickHandler}>Change card</SuperButton>
                    <div className={s.card}>Card number: </div>
                    <div className={s.card}>{card.cardsName}</div>
            </div>
        </div>
    );
}

export default CardsChanger;
