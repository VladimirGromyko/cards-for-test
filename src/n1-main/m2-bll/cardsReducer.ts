import {statePacksType} from "./packsReducer";
import {Dispatch} from "redux";
import {cardsAPI} from "../m3-dal/cards-api";

const initState: stateCardsType = {
    cards: [{
        answer: 'no answer',
        question: 'no question',
        cardsPack_id: '5eb6a2f72f849402d46c6ac4',
        grade: 4.987525071790364,
        rating: 0,
        shots: 1,
        type: 'card',
        user_id: '142151531535151',
        created: '2020-05-13T11:05:44.867Z',
        updated: '2020-05-13T11:05:44.867Z',
        __v: 0,
        _id: '5ebbd48876810f1ad0e7ece3',

    }],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: '5eecf82a3ed8f700042f1186',
}


export const cardsReducer = (state: stateCardsType = initState,
                             action: cardsReducerType): stateCardsType => {
    switch (action.type) {
        case "SET-CARDS": {
            return {
                ...state,
                ...action.data
            }
        }
        case "CHANGE-CARD": {
            return {...state};
        }
        case "FIND-CARD": {
            return {...state};
        }
        default:
            return state;
    }
};

export const setCardsAC = (data: statePacksType) => {
    return { type: "SET-CARDS", data } as const
}

export const changeCardAC = (card: string) => ({
    type: 'CHANGE-CARD', card
} as const)

export const findCardAC = (card: string) => ({
    type: 'FIND-CARD', card
} as const)

export type cardsReducerType = changeCardACType
    | findCardACType
    | setCardACType


type setCardACType = ReturnType<typeof setCardsAC>
type changeCardACType = ReturnType<typeof changeCardAC>
type findCardACType = ReturnType<typeof findCardAC>




export const fetchCardsTC =
    (packId: string) => (dispatch: Dispatch) => {
        const payload: any = {
            cardAnswer: "",
            cardQuestion: "",
            cardsPack_id: packId,
            min: 0,
            max: 0,
            sortCards: "",
            page: 1,
            pageCount: 1000,
        };

        cardsAPI
            .getAllCards(payload)
            .then((res) => {
                dispatch(setCardsAC(res.data));
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }






export type stateCardsType = {
    cards: cardsType[],
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string,
}

export type cardsType = {
    answer?: string
    question?: string
    cardsPack_id?: string
    grade?: number
    rating?: number
    shots?: number
    type?: string
    user_id?: string
    created?: string
    updated?: string
    __v?: number
    _id?: string
}