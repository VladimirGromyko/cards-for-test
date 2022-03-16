import s from './HeaderPacks.module.css'
import React from 'react'

export const HeaderPacks = () => {

    return (
        <div className={s.wrapper_header}>
            <div className={s.wrapper_header_table}>
                <div className={s.header_tableItem}>Card name</div>
                <div className={s.header_tableItem}>Cards</div>
                <div className={s.header_tableItem}>Updated</div>
                <div className={s.header_tableItem}>Creator</div>
                <div className={s.header_tableItem}>Actions</div>
            </div>
        </div>
    )
}