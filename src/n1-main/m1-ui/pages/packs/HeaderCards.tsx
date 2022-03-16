import s from '../packs/HeaderPacks.module.css'
import React from 'react'

export const HeaderCards = () => {

    return (
        <div className={s.wrapper_header}>
            <div className={s.wrapper_header_table}>
                <div className={s.header_tableItem}>Question</div>
                <div className={s.header_tableItem}>Answer</div>
                <div className={s.header_tableItem}>Updated</div>
                <div className={s.header_tableItem}>Grade</div>
            </div>
        </div>
    )
}