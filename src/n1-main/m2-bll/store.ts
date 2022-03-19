import {applyMiddleware, combineReducers, createStore} from "redux";
import {registerReducer} from './registerReducer';
import thunkMiddleware from 'redux-thunk'
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";
import {loginReducer} from "./loginReducer";
import {authReducer} from "./auth-reducer";
// import {authReducer} from "./authReducer";
import {loadingReducer} from "./loadingReducer";
import {errorReducer} from "./errorReducer";
import {authReducer1} from "./authReducer1";
import {cardsReducer1} from "./cardsReducer1";
import {packsReducer} from "./packsReducer";

const reducers = combineReducers({
    cards: cardsReducer,
    cards1:cardsReducer1,
    theme: themeReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer,
    auth1: authReducer1,
    loading: loadingReducer,
    error: errorReducer,
    packs: packsReducer,

})
const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
