import React, { useState } from "react"
import { cardsType } from "../../../m2-bll/cardsReducer"
import { useNavigate } from "react-router-dom"
import SuperRadio from "../../../m1-ui/common/c4-SuperRadio/SuperRadio"
import s from "./Card.module.css"
import SuperButton from "../../../m1-ui/common/c1-SuperButton/SuperButton"
import { PATH } from "../../routes/Paths"
import { useDispatch } from "react-redux"
import { gradeCardTC } from "../../../m2-bll/cardsReducer1"

export const LearnCard = ({
    currentCard,
    nextCardHandler,
}: CardPropsType) => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [isShowed, setIsShowed] = useState(false)
    const radioValues = ["Did not know (1)",
        "A lot of thought (2)",
        "Knew the answer (3)",
        "Knew the answer (4)",
        "Knew the answer (5)",]
    let grade = 0
    const [option, setOption] = useState("Did not know")

    if (option === 'Did not know (1)') {
        grade = 1
        }
        if (option === 'A lot of thought (2)') {
            grade = 2
        }
        if (option === 'Knew the answer (3)') {
            grade = 3
        }
        if (option === 'Knew the answer (4)') {
            grade = 4
        }
        if (option === 'Knew the answer (5)') {
            grade = 5
        }
       

    const handleNext = () => {
        setOption("Did not know")
        console.log(option)
        if (currentCard._id) {
            dispatch(gradeCardTC(grade, currentCard._id))
            setIsShowed(false)
        }
    };

    return (
        <div className={s.card}>
            <div className={s.wrapper_text}>
                <h3>Question:</h3>
                <p>{currentCard.question}</p>
            </div>
            {!isShowed && (
                <div className={s.wrapper_button}>
                    <SuperButton
                        className={"primaryButton"}
                        onClick={() => navigate(PATH.PACKS)}
                    >
                        Cancel
                    </SuperButton>
                    <SuperButton
                        className={"secondaryButton"}
                        onClick={() => setIsShowed(!isShowed)}
                    >
                        Show Answer
                    </SuperButton>
                </div>
            )}
            <div>
                {isShowed && (
                    <div className={s.answer}>
                        <div className={`${s.wrapper_answer} ${s.wrapper_text}`}>
                            <h3>Answer:</h3>
                            <p>{currentCard.answer}</p>
                        </div>
                        <div>
                            <div className={s.wrapper_radio}>
                                <SuperRadio
                                    value={option}
                                    options={radioValues}
                                    onChangeOption={setOption}
                                />
                            </div>
                            <div className={s.wrapper_button}>
                                <SuperButton
                                    className={"primaryButton"}
                                    onClick={() => setIsShowed(false)}
                                >
                                    Back
                                </SuperButton>
                                <SuperButton
                                    className={"secondaryButton"}
                                    onClick={() => handleNext()}
                                >
                                    Next
                                </SuperButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export type CardPropsType = {
    currentCard: cardsType
    nextCardHandler: (grade: number) => void
    navigateBackPage: () => void
}