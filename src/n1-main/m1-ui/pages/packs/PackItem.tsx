import React from 'react'
import {NavLink} from 'react-router-dom'
import packsStyle from '../packs/PacksTable.module.css'
import {cardPacksType} from './packsReducer'
import SuperButton from '../../../m1-ui/common/c1-SuperButton/SuperButton'
import {PATH} from '../../routes/Paths'


type TableItemPropsType = {
    pack: cardPacksType
}

export const PackItem = ({pack}: TableItemPropsType) => {

    return (
        <div className={packsStyle.items}>
            <NavLink to={PATH.CARDS}>
                {pack.name}
            </NavLink>
            <div>{pack.cardsCount}</div>
            <div>{pack.created}</div>
            <div>{pack.user_name}</div>
            <div>
                <SuperButton onClick={() => {
                    console.log('delete')
                }}>Delete</SuperButton>
                <SuperButton onClick={() => {
                    console.log('edit')
                }}>Edit</SuperButton>
            </div>
        </div>
    )
}