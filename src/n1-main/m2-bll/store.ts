import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";
import {loginReducer} from "../m1-ui/pages/login/loginReducer";

const reducers = combineReducers({
    cards: cardsReducer,
    theme: themeReducer,
    login: loginReducer
const rootReducer = combineReducers({
    auth:authReducer,
    theme:themeReducer,
    cards:cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof rootReducer>

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
