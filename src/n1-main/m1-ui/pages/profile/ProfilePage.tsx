import React from 'react'
import s from './Profile.module.css';
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import SuperButton from "../../common/c1-SuperButton/SuperButton";

export const ProfilePage = () => {


    return (
        <div className={s.wrapper}>
            <h2>Personal Information</h2>
            <img className={s.photo} src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c7caa60f60d75f36e2b2567904bba2cca3cbf48c_full.jpg" alt="Илон"/>
            <div>Nickname</div>
            <div><SuperInputText/></div>
            <div>Email</div>
            <div><SuperInputText/></div>
            <div className={s.button}><SuperButton>SAVE</SuperButton></div>
        </div>
    )
}


