import React from 'react'
import {NavLink} from 'react-router-dom'
import packsStyle from '../packs/PacksTable.module.css'
import SuperButton from '../../../m1-ui/common/c1-SuperButton/SuperButton'
import {PATH} from '../../routes/Paths'
import {CardPacksType} from "../../../m3-dal/packs-api";


type TableItemPropsType = {
    pack: CardPacksType
}

export const PackItem  = ({pack}:TableItemPropsType) => {


    return (
        <div className={packsStyle.items}>
            <NavLink to={PATH.CARDS}>
                {pack.name}
            </NavLink>

            <div>{pack.cardsCount}</div>
            <div>{pack.created}</div>
            <div>{pack.user_id}</div>
            <div>
                <SuperButton onClick={() => {

                }}>Delete</SuperButton>
                <SuperButton onClick={() => {

                }}>Edit</SuperButton>
            </div>
        </div>
    )
}