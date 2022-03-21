import s from './HeaderCards.module.css'
import React, { useState } from 'react'
import { packsAPI, SortPackNameType, SortPackNumberType } from '../../../../m3-dal/packs-api'
import { useDispatch } from 'react-redux'
import {setPacksDataAC, setPacksDataTC} from '../../../../m2-bll/packsReducer'

export const HeaderPacks = () => {

    const dispatch = useDispatch()
    const [isSorting, setIsSorting] = useState(false)

    const sortingPack = (sortPackName: SortPackNameType) => {
        if (!isSorting) {
            dispatch(setPacksDataTC(
                {
                    params:{
                        pageCount: 20,
                        sortPacks:`0${sortPackName}`,
                    }
                }
            ))
            setIsSorting(!isSorting)
        }
        if (isSorting) {
            dispatch(setPacksDataTC(
                {
                    params:{
                        pageCount: 20,
                        sortPacks:`1${sortPackName}`,
                    }
                }
            ))
            setIsSorting(!isSorting)
        }
    }

    return (
        <div className={s.wrapper_header}>

            <div className={s.wrapper_header_table} >
                <div className={s.header_tableItem} onClick={() => sortingPack('name')}>Card name
                    {isSorting ?
                    <button className={s.button}>
                        <div className={s.triangle_up}></div>
                    </button>
                    :
                    <button className={s.button}>
                        <div className={s.triangle_down}></div>
                    </button>}
                </div>
                <div className={s.header_tableItem} onClick={() => sortingPack('cardsCount')}>Cards</div>
                <div className={s.header_tableItem} onClick={() => sortingPack('updated')}>Updated</div>
                <div className={s.header_tableItem} onClick={() => sortingPack('user_name')}>Creator</div>
                <div className={s.header_tableItem}>Actions</div>
            </div>
        </div>
    )
}