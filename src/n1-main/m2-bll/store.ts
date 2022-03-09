import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";
import {loginReducer} from "../m1-ui/pages/login/loginReducer";
import {authReducer} from "./auth-reducer";

const reducers = combineReducers({
    cards: cardsReducer,
    theme: themeReducer,
    login: loginReducer,
    auth:authReducer,
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));


export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
