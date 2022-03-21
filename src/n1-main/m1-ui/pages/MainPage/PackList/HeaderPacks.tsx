import s from './HeaderCards.module.css'
import React from 'react'

export const HeaderPacks = () => {

    return (
        <div className={s.wrapper_header}>

            <div className={s.wrapper_header_table}>
                <div className={s.header_tableItem}>Name</div>
                <div className={s.header_tableItem}>Cards</div>
                <div className={s.header_tableItem}>Last Updated</div>
                <div className={s.header_tableItem}>Created by</div>
                <div className={s.header_tableItem}>Actions</div>
            </div>
        </div>
    )
}