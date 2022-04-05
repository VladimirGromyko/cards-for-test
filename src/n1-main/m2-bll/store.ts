import {applyMiddleware, combineReducers, createStore} from "redux";
import {RegisterActionType, registerReducer} from './registerReducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";
import {LoginActionsType, loginReducer} from "./loginReducer";
import {authReducer, NewPassActionsType} from "./auth-reducer";
import {LoadingACType, loadingReducer} from "./loadingReducer";
import {errorReducer, ResponseErrorACType} from "./errorReducer";
import {authReducer1, authReducerType} from "./authReducer1";
import {CardsActionType, cardsReducer1} from "./cardsReducer1";
import {packsReducer, PacksReducerType} from "./packsReducer";
import {answeredReducer, ResponseConfirmACType} from "./answeredReducer";

const reducers = combineReducers({
    cards: cardsReducer,
    cards1: cardsReducer1,
    theme: themeReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer,
    auth1: authReducer1,
    loading: loadingReducer,
    error: errorReducer,
    packs: packsReducer,
    confirm: answeredReducer,
})
const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store

export type AppStoreType = ReturnType<typeof reducers>
export type AppActionType = CardsActionType
    | RegisterActionType
    | PacksReducerType
    | LoginActionsType
    | LoadingACType
    | ResponseErrorACType
    | authReducerType
    | NewPassActionsType
    | ResponseConfirmACType


export type ThunkType = ThunkAction<void, AppStoreType, unknown, AppActionType>

// @ts-ignore
window.store = store // for dev
