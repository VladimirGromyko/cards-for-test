import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {themeReducer} from "./themeReducer";
import {cardsReducer} from "./cardsReducer";

const rootReducer = combineReducers({
    auth:authReducer,
    theme:themeReducer,
    cards:cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof rootReducer>

