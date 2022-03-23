import React, { useState } from "react"
import {cardsType} from "../../../m2-bll/cardsReducer"
import { useNavigate } from "react-router-dom"
import SuperRadio from "../../../m1-ui/common/c4-SuperRadio/SuperRadio"
import s from "./Card.module.css"
import SuperButton from "../../../m1-ui/common/c1-SuperButton/SuperButton"
import {PATH} from "../../routes/Paths"

export const LearnCard = ({
                         currentCard,
                         isChecked,
                         setIsChecked,
                         nextCardHandler,
                     }: CardPropsType) => {
    const navigate = useNavigate()

    const buttonValues = ["Did not know", "A lot of thought", "Knew the answer"]
    const [option, setOption] = useState("Did not know")

    const handleNext = () => {
        setOption("Did not know")

    };

    return (
        <div className={s.card}>
            <div className={s.wrapper_text}>
                <h3>Question:</h3>
                <p>{currentCard.question}</p>
            </div>
            {!isChecked && (
                <div className={s.wrapper_button}>
                    <SuperButton
                        className={"primaryButton"}
                        onClick={() => navigate(PATH.PACKS)}
                    >
                        Cancel
                    </SuperButton>
                    <SuperButton
                        className={"secondaryButton"}
                        onClick={() => setIsChecked(!isChecked)}
                    >
                        Show Answer
                    </SuperButton>
                </div>
            )}
            <div>
                {isChecked && (
                    <div className={s.answer}>
                        <div className={`${s.wrapper_answer} ${s.wrapper_text}`}>
                            <h3>Answer:</h3>
                            <p>{currentCard.answer}</p>
                        </div>
                        <div>
                            <div className={s.wrapper_radio}>
                                <SuperRadio
                                    value={option}
                                    options={buttonValues}
                                    onChangeOption={setOption}
                                />
                            </div>
                            <div className={s.wrapper_button}>
                                <SuperButton
                                    className={"primaryButton"}
                                    onClick={() => setIsChecked(false)}
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
    isChecked: boolean
    setIsChecked: (isChecked: boolean) => void
    nextCardHandler: (grade: number) => void
    navigateBackPage: () => void
}