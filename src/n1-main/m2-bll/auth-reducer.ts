import {Dispatch} from 'redux'
import {authsAPI} from "../m3-dal/api/cards-api";
import {AppStoreType} from "./store";


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
export const changeUserNameAC = (name: string) =>
    ({type: 'UPDATE_USER_NAME', name} as const)

// thunks
export const changeUserNameTC = (name: string) => (dispatch: Dispatch<ActionsType>) => {
authsAPI.updateUser(name)
    .then((res) => {
        console.log('res updateUserNameTC: ', res)
        dispatch(changeUserNameAC(name))

    })
}

// export const changeTodolistTitleTC = (id: string, title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         todolistsAPI.updateTodolist(id, title)
//             .then((res) => {
//                 dispatch(changeTodolistTitleAC(id, title))
//             })
//     }
// }



// types
export type UpdateUseNameACType = ReturnType<typeof changeUserNameAC>
export type ActionsType = UpdateUseNameACType

