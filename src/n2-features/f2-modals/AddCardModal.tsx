import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {addCardTC} from "../../n1-main/m2-bll/cardsReducer1";
import SuperButton from "../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import SuperInputText from "../../n1-main/m1-ui/common/c2-SuperInput/SuperInputText";
import {Modal} from "./Modal";

type AddCardModalPropsType = {
    show: boolean
    setShow: (value:boolean)=>void
    packId: string | undefined
}

export const AddCardModal = ({show, setShow , packId}: AddCardModalPropsType) => {
    const [quest, setQuest] = useState('')
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()


    const onClickAddCards = () => {
        if (packId) {
            dispatch(addCardTC({packId, quest, answer}))
            setShow(false)
            setQuest('')
            setAnswer('')
        }
    }

    const onQuestionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuest(e.currentTarget.value)
    }
    const onAnswerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    return (
        <>
            <SuperButton onClick={() => setShow(true)}>Add card</SuperButton>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                width={400}
                height={400}
                show={show}
            >
                <h2>Add card</h2>
                <div > Question:</div>
                <div style={{margin:'10px'}}> <SuperInputText type='text' onChange={onQuestionInputChange}/></div>

                <div> Answer: </div>
                <div style={{margin:'10px'}}> <SuperInputText type='text' onChange={onAnswerInputChange}/></div>

                <SuperButton onClick={onClickAddCards}>Add</SuperButton>
                <SuperButton onClick={() => setShow(false)}>Close</SuperButton>
            </Modal>
        </>
    );
};