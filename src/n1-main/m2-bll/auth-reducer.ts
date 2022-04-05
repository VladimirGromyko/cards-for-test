import {Dispatch} from 'redux'
import { authAPI } from '../m3-dal/auth-api'
// import {authsAPI} from "../m3-dal/cards-api";
// import {authAPI} from "../m3-dal/auth-api";

const initialState = {
    name: ''
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: NewPassActionsType): InitialStateType => {
    switch (action.type) {

        case "CHANGE_USER_NAME":
            return {...state, name: action.name}
        default:
            return state
    }
}
// actions
export const changeUserNameAC = (name: string) =>
    ({type: 'CHANGE_USER_NAME', name} as const)

// thunks
export const changeUserNameTC = (name: string) => (dispatch: Dispatch<NewPassActionsType>) => {
authAPI.updateUser(name)
    .then((res) => {
        // console.log('res updateUserNameTC: ', res.data)
        dispatch(changeUserNameAC(name))
    })
}


// types
export type UpdateUseNameACType = ReturnType<typeof changeUserNameAC>
export type NewPassActionsType = UpdateUseNameACType
