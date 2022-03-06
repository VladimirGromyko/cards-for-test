import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";
import {loginReducer} from "../m1-ui/pages/login/loginReducer";

const reducers = combineReducers({
    cards: cardsReducer,
    theme: themeReducer,
    login: loginReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
