import {useNavigate, useParams} from "react-router-dom"
import React, {useEffect, useState} from "react"
import { LearnCard } from "./LearnCard"
import s from "./LearnPage.module.css"
import { PATH } from "../../routes/Paths"
import {useDispatch, useSelector} from "react-redux";
import {CardType, getCardsTC, gradeCardTC} from "../../../m2-bll/cardsReducer1"
import {AppStoreType} from "../../../m2-bll/store";
import l from "../../common/c7-Loading/loader07.module.css";


export const LearnPage = () => {
    const isLoading = useSelector<AppStoreType>(state => state.loading.isLoading);
    const cards = useSelector<AppStoreType>(state => state.cards.cards)
    const [isShowed, setIsShowed] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const packId = params.id
    const [first, setFirst] = useState(true);

    const [currentCard, setCurrentCard] = useState<CardType>({}) //

    const navigateBackPage = () => navigate(PATH.PACKS)

    const nextCardHandler = (grade: number) => {
        setCurrentCard(getCard(cards))
        dispatch(gradeCardTC((+grade), currentCard._id ? currentCard._id : '11111'))
        setIsShowed(false);
    }

    useEffect(() => {
        if (first) {

            packId && dispatch(getCardsTC(packId));
            setFirst(false);
        }

        if (cards.length > 0) {
            setCurrentCard(getCard(cards));
        }

    }, [cards, dispatch]);

    if (isLoading === "loading") {
        return isLoading === "loading" && <div className={l.loader07}></div>
    }


    return (
        <>
            <div className={s.wrapper}>
                    <LearnCard
                        currentCard={currentCard}
                        isShowed={isShowed}
                        setIsShowed={setIsShowed}
                        nextCardHandler={nextCardHandler}
                        navigateBackPage={navigateBackPage}
                    />
            </div>
        </>
    )
}







//utility


const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}