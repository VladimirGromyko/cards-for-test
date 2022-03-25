import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {addCardTC, deleteCardTC} from "../../n1-main/m2-bll/cardsReducer1";
import SuperButton from "../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import SuperInputText from "../../n1-main/m1-ui/common/c2-SuperInput/SuperInputText";
import {Modal} from "./Modal";

type DeleteCardModalPropsType = {
    show: boolean
    setShow: (value:boolean)=>void
    cardId: string
}

export const DeleteCardModal = ({show, setShow , cardId}: DeleteCardModalPropsType) => {

    const dispatch = useDispatch()
    const onClickDeleteCards = () => {
        dispatch(deleteCardTC(cardId))
        setShow(false)
    }
    return (
        <>
            <SuperButton onClick={() => setShow(true)}>Delete</SuperButton>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                width={400}
                height={400}
                show={show}
            >
                <h2>Delete card</h2>
                <div>You really want to delete this card?</div>
                <SuperButton onClick={onClickDeleteCards}>Delete</SuperButton>
                <SuperButton onClick={() => setShow(false)}>Close</SuperButton>
            </Modal>
        </>
    );
};