import s from './HeaderCards.module.css'
import React, { useState } from 'react'
import { packsAPI, SortPackNameType, SortPackNumberType } from '../../../../m3-dal/packs-api'
import { useDispatch } from 'react-redux'
import { setPacksDataAC } from '../../../../m2-bll/packsReducer'

export const HeaderPacks = () => {

    const dispatch = useDispatch()
    const [isSorting, setIsSorting] = useState(false)

    const sortingPack = (sortPackName: SortPackNameType) => {
        if (!isSorting) {
            packsAPI.setSortPacks(0, sortPackName).then(res => {
                dispatch(setPacksDataAC(res.data))
                setIsSorting(!isSorting)
            })
        }
        if (isSorting) {
            packsAPI.setSortPacks(1, sortPackName).then(res => {
                dispatch(setPacksDataAC(res.data))
                setIsSorting(!isSorting)
            })
        }
    }

    return (
        <div className={s.wrapper_header}>

            <div className={s.wrapper_header_table} >
                <div className={s.header_tableItem} onClick={() => sortingPack('name')}>Card name
                    {/* {isSorting ? 
                    <button className={s.button}>
                        <div className={s.triangle_up}></div>
                    </button>
                    : 
                    <button className={s.button}>
                        <div className={s.triangle_down}></div>
                    </button>} */}
                </div>
                <div className={s.header_tableItem} onClick={() => sortingPack('cardsCount')}>Cards</div>
                <div className={s.header_tableItem} onClick={() => sortingPack('updated')}>Updated</div>
                <div className={s.header_tableItem} onClick={() => sortingPack('user_name')}>Creator</div>
                <div className={s.header_tableItem}>Actions</div>
            </div>
        </div>
    )
}