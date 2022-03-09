import React, {useEffect} from 'react'
import s from './Profile.module.css';
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {changeUserNameTC} from "../../../m2-bll/auth-reducer";



export const ProfilePage = () => {
    const userName=useSelector<AppStoreType,string>((state)=> state.auth.name)
    //const userName=useSelector<AppStoreType,string>((state)=> state.auth.name)


    const dispatch = useDispatch()

    // const FunctionFor = (name:string) => {
    //     dispatch(changeUserNameTC(userName))
    // }

    // useEffect(() => {
    //         dispatch(changeUserNameTC('dianka'))
    // }, [])



    return (
        <div className={s.wrapper}>
            <h2>Personal Information</h2>
            <img className={s.photo} src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c7caa60f60d75f36e2b2567904bba2cca3cbf48c_full.jpg" alt="Илон"/>
            <div>Nickname  </div>
            <div><SuperInputText
                value={userName}
                //onChangeText={FunctionFor}
            /></div>
            <div>
                <button onClick={() => { dispatch(changeUserNameTC('dianka')) }}>Save</button>
            </div>
            <div>Email</div>
            <div><SuperInputText  value={userName}/></div>
            <div className={s.button}><SuperButton>SAVE</SuperButton></div>
        </div>
    )
}


