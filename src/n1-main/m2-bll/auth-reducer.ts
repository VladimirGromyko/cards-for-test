import { Dispatch } from 'redux'
import {authsAPI} from "../m3-dal/api/cards-api";


const initialState = {
    name: 'nya-admin@nya.nya'
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case "UPDATE_USER_NAME":
            return {...state, name: action.name}
        default:
            return state
    }
}
// actions
export const updateUserNameAC = (name: string) =>
    ({type: 'UPDATE_USER_NAME', name} as const)

// thunks
export const updateUserNameTC = (name:string) => (dispatch: Dispatch<ActionsType>) => {
    authsAPI.updateUser(name)
        .then((res)=>{
            // log
            console.log('res updateUserNameTC: ', res)
               // dispatch(updateUserNameAC(name))
            })
        }

// types
export type UpdateUseNameACType = ReturnType<typeof updateUserNameAC>
export type ActionsType = UpdateUseNameACType