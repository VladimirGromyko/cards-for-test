import React, {useEffect, useState} from 'react'
import s from './EditProfile.module.css';
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {changeUserNameTC} from "../../../../m2-bll/auth-reducer";
import { Navigate } from 'react-router-dom';
import {PATH} from "../../../routes/Paths";


export const EditProfilePage = () => {
    const userName = useSelector<AppStoreType, string | undefined>((state) => state.login.user?.name)
    const userEmail = useSelector<AppStoreType, string | undefined>((state) => state.login.user?.email)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)

    const dispatch = useDispatch()

    const [nameFromInput, setNameFromInput] = useState<string>('')

    const onChangeNameHandler = () => {
        dispatch(changeUserNameTC(nameFromInput))
    }

    useEffect(() => {
        userName && setNameFromInput(userName)
    }, [userName])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} />
    }

    return (
        <div className={s.wrapper}>
            <h3>Personal Information</h3>
            <img className={s.photo}
                 src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c7caa60f60d75f36e2b2567904bba2cca3cbf48c_full.jpg"
                 alt="UserPhoto"/>
            <div className={s.inputTitle}>Nickname</div>
            <div>
                <SuperInputText
                    value={nameFromInput}
                    onChangeText={setNameFromInput}
                />
            </div>
            <div className={s.inputTitle}>Email</div>
            <div><SuperInputText value={userEmail}/></div>
            <div className={s.button}><SuperButton onClick={onChangeNameHandler}>SAVE</SuperButton></div>
        </div>
    )
}


