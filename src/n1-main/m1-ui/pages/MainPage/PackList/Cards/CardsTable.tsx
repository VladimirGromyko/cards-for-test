import React, {ChangeEvent, CSSProperties, useCallback, useEffect, useState} from 'react'
import cardsStyle from './CardsTable.module.css'
import s from "../../../p3-pass-recovery/PassRecovery.module.css"
import {useDispatch, useSelector} from "react-redux";
import {cardsAPI, SortNameType, SortNumberType} from "../../../../../m3-dal/cards-api";
import {AppStoreType} from "../../../../../m2-bll/store";
import {addCardTC, CardType, deleteCardTC} from "../../../../../m2-bll/cardsReducer1";
import {CardItem} from "../CardItem";
import SuperInputText from "../../../../common/c2-SuperInput/SuperInputText";
import SuperButton from "../../../../common/c1-SuperButton/SuperButton";

export type CardsTablePropsType = {
    getCards: (packId:string, sortNumber?:SortNumberType, sortName?: SortNameType)=> void
    packId:string | undefined
}

const CardsTable = ({packId, ...props}: CardsTablePropsType) => {

    const cardsIsGot = useSelector<AppStoreType, CardType[]>(state => state.cards1.cards)
    const dispatch = useDispatch()

    
    const [show, setShow] = useState(false);

    const getCards = useCallback((sortNumber?:SortNumberType, sortName?: SortNameType) => {
        if (packId) {
            props.getCards(packId, sortNumber, sortName)
        }
    }, [packId, props])

    const onClickGetCards = () => {
        getCards()
    }


    const onClickDeleteCards = (cardId: string) => {
            dispatch(deleteCardTC(cardId))
    }



    return (
        <div className={cardsStyle.container}>
            {
                cardsIsGot.map(card => {
                    return <CardItem card={card} 
                    onClickDeleteCards={onClickDeleteCards}/>
                })
            }
            
            <SuperButton onClick={onClickGetCards}>get card</SuperButton>
            <ModalContainer show={show} setShow={setShow} packId={packId}/>
        </div>
    );
};

export default CardsTable;


type ModalPropsType = {
    show: boolean
    setShow: (value:boolean)=>void
    packId: string | undefined
}

const ModalContainer = ({show, setShow , packId}: ModalPropsType) => {
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
                width={350}
                height={350}
                show={show}
            >
                Simple Modal
                <SuperInputText type='text' onChange={onQuestionInputChange}/>
                <SuperInputText type='text' onChange={onAnswerInputChange}/>
                <SuperButton onClick={onClickAddCards}>Add</SuperButton>
                <SuperButton onClick={() => setShow(false)}>Close</SuperButton>
            </Modal>
        </>
    );
};

interface IModal {
    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;

    show: boolean
}

const Modal: React.FC<IModal> = (
    {
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},

        width,
        height,
        modalStyle,
        modalOnClick = () => {},

        show,
        children,
    }
) => {
    const top = `calc(50vh - ${height / 2}px)`;
    const left = `calc(50vw - ${width / 2}px)`;

    if (!show) return null;

    return (
        <>
            {enableBackground && <div
                style={{
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    width: '100vw',
                    height: '100vh',

                    background: 'black',
                    opacity: 0.35,
                    zIndex: 20,

                    ...backgroundStyle,
                }}
                onClick={backgroundOnClick}
            />}
            <div className={s.wrapper}
                style={{
                    position: 'fixed',
                    top,
                    left,
                    width,
                    height,
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 21,

                    ...modalStyle,
                }}
                onClick={modalOnClick}
            >
                {children}
            </div>
        </>
    );
};