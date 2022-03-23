import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import {
    cardsType,
    fetchCardsTC,
} from "../../../m2-bll/cardsReducer"
import { LearnCard } from "./LearnCard"
import s from "./LearnPage.module.css"
import { PATH } from "../../routes/Paths"
import {useDispatch} from "react-redux";
import { gradeCardTC } from "../../../m2-bll/cardsReducer1"


export const LearnPage = () => {
    // const cards = useSelector((state: AppStoreType) => state.cards.cards)
    const [isChecked, setIsChecked] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentCard, setCurrentCard] = useState<cardsType>({})

    const navigateBackPage = () => navigate(PATH.PACKS)

    const nextCardHandler = (grade: number) => {
        dispatch(
            gradeCardTC((+grade), currentCard._id ? currentCard._id : '11111')
        )
        setIsChecked(false);
    }

    return (
        <>
            <div className={s.wrapper}>
                    <LearnCard
                        currentCard={currentCard}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        nextCardHandler={nextCardHandler}
                        navigateBackPage={navigateBackPage}
                    />
            </div>
        </>
    )
}