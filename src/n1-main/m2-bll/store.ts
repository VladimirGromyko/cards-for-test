import {applyMiddleware, combineReducers, createStore} from "redux";
import {registerReducer} from './registerReducer';
import thunkMiddleware from 'redux-thunk'
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";
<<<<<<< HEAD
import {loginReducer} from "./loginReducer";
=======
import {loginReducer} from "../m1-ui/pages/login/loginReducer";
>>>>>>> a9f7a81205c803184cb21de70578ed6f5d7e06d3
import {authReducer} from "./auth-reducer";
// import {authReducer} from "./authReducer";
import {loadingReducer} from "./loadingReducer";
import {errorReducer} from "./errorReducer";
import {authReducer1} from "./authReducer1";
<<<<<<< HEAD
import {packsReducer} from "../m1-ui/pages/packs/packsReducer";
=======
>>>>>>> a9f7a81205c803184cb21de70578ed6f5d7e06d3

const reducers = combineReducers({
    cards: cardsReducer,
    theme: themeReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer,
    auth1: authReducer1,
    loading: loadingReducer,
<<<<<<< HEAD
    error: errorReducer,
    packs: packsReducer,
=======
    error: errorReducer
>>>>>>> a9f7a81205c803184cb21de70578ed6f5d7e06d3
})
const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
