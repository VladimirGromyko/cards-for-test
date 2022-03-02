export type stateCardsType = {
    cardsName: string
}
const initState: stateCardsType = {
    cardsName: '1'
};


export const cardsReducer = (state: stateCardsType = initState,
                             action: cardsReducerType): stateCardsType => {
    switch (action.type) {
        case "CHANGE-CARD": {
            return {...state, cardsName: action.card};
        }
        case "FIND-CARD": {
            return {...state, cardsName: action.card};
        }
        default:
            return state;
    }
};

export const changeCardAC = (card: string) => ({
    type: 'CHANGE-CARD', card
} as const);

export const findCardAC = (card: string) => ({
    type: 'FIND-CARD', card
} as const);

export type cardsReducerType = changeCardACType
    | findCardACType

type changeCardACType = ReturnType<typeof changeCardAC>
type findCardACType = ReturnType<typeof findCardAC>