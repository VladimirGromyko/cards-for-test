import {combineReducers, createStore} from "redux";
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";

const reducers = combineReducers({
    cards: cardsReducer,
    theme: themeReducer,

})

const store = createStore(reducers)

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
