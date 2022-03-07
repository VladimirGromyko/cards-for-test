import {applyMiddleware, combineReducers, createStore} from "redux";
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./authReducer";

const reducers = combineReducers({
    cards: cardsReducer,
    theme: themeReducer,
    auth: authReducer
})
const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
