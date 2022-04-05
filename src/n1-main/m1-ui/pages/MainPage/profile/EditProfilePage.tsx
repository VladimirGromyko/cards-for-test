import React, {useEffect, useState} from 'react'
import s from './EditProfile.module.css';
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {changeUserNameTC} from "../../../../m2-bll/auth-reducer";
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from "../../../routes/Paths";


export const EditProfilePage = () => {
    const userName = useSelector<AppStoreType, string | undefined>((state) => state.login.user?.name)
    const userEmail = useSelector<AppStoreType, string | undefined>((state) => state.login.user?.email)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN)
        }
                else return
    }, [])

    const [nameFromInput, setNameFromInput] = useState<string>('')

    const onChangeNameHandler = () => {
        dispatch(changeUserNameTC(nameFromInput))
    }

    useEffect(() => {
        userName && setNameFromInput(userName)

    }, [userName])


    return (<div className={s.superWrapper}>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <h3>Personal Information</h3>
                    <img className={s.photo}
                         src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c7caa60f60d75f36e2b2567904bba2cca3cbf48c_full.jpg"
                         alt="UserPhoto"/>
                    <div className={s.containerForEmail}>
                        <div className={s.textField}>Nickname</div>
                        <div>
                            <SuperInputText
                                value={nameFromInput}
                                onChangeText={setNameFromInput}
                            />
                        </div>
                    </div>
                    <div className={s.containerForPassword}>
                        <div className={s.textField}>Email</div>
                        <div><SuperInputText value={userEmail}/></div>
                    </div>
                    <div className={s.button}><SuperButton onClick={onChangeNameHandler}>SAVE</SuperButton></div>
                </div>
            </div>
        </div>
    )
}


