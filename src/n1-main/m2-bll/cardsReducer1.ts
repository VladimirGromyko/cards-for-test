export type CardType  = {
    question: string,
    answer: string,
    updated: string,
    grade: number,

}

export type CardsStateType = {
    cards: CardType[];
    packUserId?: string,
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
        case "GET-PACK-USER-ID":{
            return {...state, packUserId: action.packUserId}
        }
        default:
            return state;
    }
};

export const getAllCardAC = (cards: CardType[]) => ({
    type: 'GET-ALL-CARD', cards
} as const);

export const getPackUserIdAC = (packUserId: string) => ({
    type: 'GET-PACK-USER-ID', packUserId
} as const);

export const addCardAC = (card: CardType) => ({
    type: 'ADD-CARD', card
} as const);

type GetAllCardActionType = ReturnType<typeof getAllCardAC>
type AddCardActionType = ReturnType<typeof addCardAC>
type GetPackUserIdACActionType = ReturnType<typeof getPackUserIdAC>

type ActionType = GetAllCardActionType | AddCardActionType | GetPackUserIdACActionType
