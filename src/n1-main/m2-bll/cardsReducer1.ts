import {Dispatch} from "redux";
import {cardsAPI, SortNameType, SortNumberType} from "../m3-dal/cards-api";
import {loadingAC} from "./loadingReducer";
import {responseErrorAC} from "./errorReducer";
import {showMainPageAC} from "./packsReducer";

export type CardType  = {
    _id: string,
    question: string,
    answer: string,
    updated: string,
    grade: number,

}

export type CardsStateType = {
    cards: CardType[];
}
const initState: CardsStateType = {cards:[]};


export const cardsReducer1 = (state = initState,
                             action: ActionType): CardsStateType => {
    switch (action.type) {
        case "GET-ALL-CARD":{
            return  {...state, cards: action.cards}
        }
        case "ADD-CARD": {
            return {...state, cards: [...state.cards, action.card] }
        }
        case 'DELETE-CARD':
            return {...state, cards: state.cards.filter(t => t._id !== action.cardId)}
        default:
            return state;
    }
};

export const getAllCardAC = (cards: CardType[]) => ({
    type: 'GET-ALL-CARD', cards
} as const);


export const addCardAC = (card: CardType) => ({
    type: 'ADD-CARD', card
} as const);

export const deleteCardAC = (cardId: string) => ({
    type: 'DELETE-CARD', cardId
} as const);

export const getCardsTC = (params:{packId:string,sortNumber?: SortNumberType, sortName?: SortNameType }) => (dispatch: Dispatch) => {
    dispatch(loadingAC('loading'))
    debugger
    cardsAPI.getAllCards({
        cardsPackId: params.packId,
        pageCount: '1000',
        sortNumber: params.sortNumber,
        sortName: params.sortName}).then(res => {
        dispatch(getAllCardAC(res.data.cards))
    }).catch((err) => {
        dispatch(responseErrorAC(true, 'setPacks', err.response?.data.error))
        setTimeout(() => {
            dispatch(responseErrorAC(false, 'setPacks', err.response?.data.error))
        }, 3000)
    })
        .finally(() => {
            dispatch(loadingAC('succeeded'))

        })
}

export const getCardsBySearchTC = (params:{packId:string,search:string }) => (dispatch: Dispatch) => {
    dispatch(loadingAC('loading'))
    cardsAPI.getCardBySearch({cardsPackId: params.packId, pageCount: '1000', search: params.search}).then(res => {
        dispatch(getAllCardAC(res.data.cards))
    }).catch((err) => {
        dispatch(responseErrorAC(true, 'setPacks', err.response?.data.error))
        setTimeout(() => {
            dispatch(responseErrorAC(false, 'setPacks', err.response?.data.error))
        }, 3000)
    })
        .finally(() => {
            dispatch(loadingAC('succeeded'))

        })
}

export const addCardTC = (params:{packId:string, quest:string, answer:string}) => (dispatch: Dispatch) => {
    dispatch(loadingAC('loading'))
    cardsAPI.addCard({cardsPack_id:params.packId, question: params.quest, answer:params.answer}).then(res => {
        //@ts-ignore
        dispatch(getCardsTC({packId:params.packId}))
        }
    ).catch((err) => {
        dispatch(responseErrorAC(true, 'setPacks', err.response?.data.error))
        setTimeout(() => {
            dispatch(responseErrorAC(false, 'setPacks', err.response?.data.error))
        }, 3000)
    })
        .finally(() => {
            dispatch(loadingAC('succeeded'))

        })
}
export const deleteCardTC = (params:{packId:string, cardId:string}) => (dispatch: Dispatch) => {
    dispatch(loadingAC('loading'))
    cardsAPI.deleteCard({cardId: params.cardId}).then(res=>{
        //@ts-ignore
        dispatch(getCardsTC({packId:params.packId}))
    }).catch((err) => {
        dispatch(responseErrorAC(true, 'setPacks', err.response?.data.error))
        setTimeout(() => {
            dispatch(responseErrorAC(false, 'setPacks', err.response?.data.error))
        }, 3000)
    })
        .finally(() => {
            dispatch(loadingAC('succeeded'))

        })
}


type GetAllCardActionType = ReturnType<typeof getAllCardAC>
type AddCardActionType = ReturnType<typeof addCardAC>
type DeleteCardACActionType = ReturnType<typeof deleteCardAC>

type ActionType = GetAllCardActionType | AddCardActionType | DeleteCardACActionType
