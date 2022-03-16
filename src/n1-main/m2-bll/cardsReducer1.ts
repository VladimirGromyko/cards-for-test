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

type GetAllCardActionType = ReturnType<typeof getAllCardAC>
type AddCardActionType = ReturnType<typeof addCardAC>
type DeleteCardACActionType = ReturnType<typeof deleteCardAC>

type ActionType = GetAllCardActionType | AddCardActionType | DeleteCardACActionType
