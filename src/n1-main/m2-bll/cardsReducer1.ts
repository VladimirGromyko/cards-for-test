import {Dispatch} from "redux";
import {cardsAPI, GradeCardPayload, SortNameType, SortNumberType} from "../m3-dal/cards-api";
import {loadingAC} from "./loadingReducer";
import {responseErrorAC} from "./errorReducer";
import {showMainPageAC} from "./packsReducer";
import { ThunkType } from "./store";

export type CardType  = {
    _id: string,
    question: string,
    answer: string,
    updated: string,
    grade: number,
    cardsPack_id:string,
    user_id:string

}

export type CardsStateType = {
    cards: CardType[];
    sortNumber?: SortNumberType,
    sortName?: SortNameType
    search?:string
    packUserId: string
}
const initState: CardsStateType = {
    cards:[],
    sortNumber: 0,
    sortName: 'answer',
    search: '',
    packUserId: '',
};


export const cardsReducer1 = (state = initState,
                             action: CardsActionType): CardsStateType => {
    switch (action.type) {
        case "GET-ALL-CARD":{
            return  {...state, cards: action.cards}
        }
        case "SORT-CARDS" : {
            return {...state, sortName: action.sortName, sortNumber: action.sortNumber}
        }
        case 'SEARCH-CARDS': {
            return {...state, search: action.search}
        }
        case "ADD-CARD": {
            return {...state, cards: [...state.cards, action.card] }
        }
        case 'DELETE-CARD':
            return {...state, cards: state.cards.filter(t => t._id !== action.cardId)}
        case 'SET-CARD-GRADE': {
            return {
                ...state,
                cards: state.cards.map((card) =>
                    card._id === action.cardId ? { ...card, grade: action.grade } : card
                ),
            };
        }
        default:
            return state;
    }
};

export const getAllCardAC = (cards: CardType[]) => ({
    type: 'GET-ALL-CARD', cards
} as const);
export const sortCardsAC = (sortNumber?: SortNumberType, sortName?: SortNameType) => ({
    type: 'SORT-CARDS', sortNumber,sortName
} as const);

export const searchCardsAC = (search?: string) => ({
    type: 'SEARCH-CARDS', search
} as const);

export const addCardAC = (card: CardType) => ({
    type: 'ADD-CARD', card
} as const);

export const deleteCardAC = (cardId: string) => ({
    type: 'DELETE-CARD', cardId
} as const);
export const setCardGradeAC = (grade: number, cardId: string) => {
    return { type: 'SET-CARD-GRADE', grade, cardId } as const;
};

export const getCardsTC = (params:{packId:string,sortNumber?: SortNumberType, sortName?: SortNameType }):ThunkType => (dispatch, getState) => {
    dispatch(loadingAC('loading'))
    cardsAPI.getAllCards({
        cardsPackId: params.packId,
        pageCount: '1000',
        sortNumber: params.sortNumber,
        sortName: params.sortName,
        search: getState().cards1.search
    }).then(res => {
        dispatch(sortCardsAC(params.sortNumber, params.sortName))
        dispatch(getAllCardAC(res.data.cards))
    }).catch((err) => {
    })
        .finally(() => {
            dispatch(loadingAC('succeeded'))

        })
}

export const getCardsBySearchTC = (params:{packId:string,search:string }):ThunkType => (dispatch, getState) => {
    dispatch(loadingAC('loading'))
    cardsAPI.getAllCards({
        cardsPackId: params.packId,
        pageCount: '1000', 
        search: params.search,
        sortNumber: getState().cards1.sortNumber,
        sortName: getState().cards1.sortName
    }).then(res => {
        dispatch(searchCardsAC(params.search))
        dispatch(getAllCardAC(res.data.cards))
    }).catch((err) => {
        dispatch(loadingAC('succeeded'))
    })
        .finally(() => {
            dispatch(loadingAC('succeeded'))

        })
}

export const addCardTC = (params:{packId:string, quest:string, answer:string}):ThunkType => (dispatch, getState) => {
    dispatch(loadingAC('loading'))
    cardsAPI.addCard({cardsPack_id:params.packId, question: params.quest, answer:params.answer}).then(res => {
        dispatch(getCardsTC({packId:params.packId}))
        }
    ).catch((err) => {
        dispatch(loadingAC('succeeded'))
        
    })
}
export const deleteCardTC = (cardId:string):ThunkType => (dispatch, getState) => {
    dispatch(loadingAC('loading'))
    cardsAPI.deleteCard({cardId}).then(res=>{
        dispatch(getCardsTC({packId:getState().cards1.cards[0].cardsPack_id}))
    }).catch((err) => {
        dispatch(loadingAC('succeeded'))
        
    })
}

export const gradeCardTC =
    (grade: number, cardId: string) => (dispatch: Dispatch) => {
        dispatch(loadingAC('loading'));

        const payload: GradeCardPayload = {
            grade,
            cardId: cardId,
        };

        cardsAPI
            .gradeCard(payload)
            .then(() => {
                dispatch(loadingAC('succeeded'));
                dispatch(setCardGradeAC(grade, cardId));
            })
            .catch((err) => {
                dispatch(loadingAC('succeeded'))
            })
    };


type GetAllCardActionType = ReturnType<typeof getAllCardAC>
type SortCardsActionType = ReturnType<typeof sortCardsAC>
type SearchCardsActionType = ReturnType<typeof searchCardsAC>
type AddCardActionType = ReturnType<typeof addCardAC>
type DeleteCardACActionType = ReturnType<typeof deleteCardAC>
type setCardGradeType = ReturnType<typeof setCardGradeAC>

export type CardsActionType = GetAllCardActionType 
| AddCardActionType 
| DeleteCardACActionType 
| SortCardsActionType 
| SearchCardsActionType
| setCardGradeType
