import React, { useState } from "react"
import {cardsType} from "../../../m2-bll/cardsReducer"
import { useNavigate } from "react-router-dom"
import SuperRadio from "../../../m1-ui/common/c4-SuperRadio/SuperRadio"
import s from "./Card.module.css"
import SuperButton from "../../../m1-ui/common/c1-SuperButton/SuperButton"
import {PATH} from "../../routes/Paths"

export const LearnCard = ({
                         currentCard,
                              isShowed,
                              setIsShowed,
                         nextCardHandler,
                     }: CardPropsType) => {
    const navigate = useNavigate()

    const radioValues = ["Did not know", "A lot of thought", "Knew the answer"]
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
    isShowed: boolean
    setIsShowed: (isChecked: boolean) => void
    nextCardHandler: (grade: number) => void
    navigateBackPage: () => void
}