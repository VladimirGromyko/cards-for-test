import {Dispatch} from 'redux'
import { authAPI } from '../m3-dal/auth-api'


const initialState = {
    name: '',
    avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c7caa60f60d75f36e2b2567904bba2cca3cbf48c_full.jpg'

}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: NewPassActionsType): InitialStateType => {
    switch (action.type) {

        case "CHANGE_USER_NAME":
            return {...state, name: action.name}
        // case "CHANGE_AVATAR":
        //     return {...state, avatar: action.file}
        default:
            return state
    }
}
// actions
export const changeUserNameAC = (name: string) =>
    ({type: 'CHANGE_USER_NAME', name} as const)
export const changeAvatarAC = (file: string) =>
    ({type: 'CHANGE_AVATAR', file} as const)

// thunks
export const changeUserNameTC = (name: string) => (dispatch: Dispatch<NewPassActionsType>) => {
authAPI.updateUser(name)
    .then((res) => {
        // console.log('res updateUserNameTC: ', res.data)
        dispatch(changeUserNameAC(name))
    })
}

// export const changeAvatarTC = (file: string) => (dispatch: Dispatch<NewPassActionsType>) => {
//     authAPI.changeAvatar(file)
//         .then((res) => {
//             dispatch(changeAvatarAC(file))
//         })
// }



// types
export type UpdateUseNameACType = ReturnType<typeof changeUserNameAC>
export type changeAvatarACType = ReturnType<typeof changeAvatarAC>

export type NewPassActionsType = UpdateUseNameACType
