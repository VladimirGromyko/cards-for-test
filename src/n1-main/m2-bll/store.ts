import {applyMiddleware, combineReducers, createStore} from "redux";
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./authReducer";
import {loadingReducer} from "./loadingReducer";
import {errorReducer} from "./errorReducer";

const reducers = combineReducers({
    cards: cardsReducer,
    theme: themeReducer,
    auth: authReducer,
    loading: loadingReducer,
    error: errorReducer
})
const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
