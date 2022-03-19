import React, {useEffect, useState} from 'react'
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import s from './LoginPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {PATH} from "../../routes/Paths";
import { useNavigate } from 'react-router-dom';
import {getAuthUserDataTC} from "../../../m2-bll/loginReducer";
import l from "../../common/c7-Loading/loader07.module.css";

// import {useNavigate} from "react-router-dom";

const LoginPage =() => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const navigate = useNavigate()



    const logInHandler = () => {
        dispatch(getAuthUserDataTC(email, password, rememberMe))
    }
    const changeEmail = (e: string) => {
        setEmail(e)
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate(PATH.PROFILE)
        }
    }, [isLoggedIn,navigate])



    return (<div className={`${s.wrapper}`}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <h4>SIGN IN</h4>
            <SuperInputText type={'email'}
                            value={email}
                                placeholder={'Enter email'}
                                onChangeText={changeEmail}
            />
            <SuperInputText type={'password'}
                            value={password}
                                placeholder={'Password'}
                                onChangeText={setPassword}
            />
            <div className={s.wrapper_submit_checkbox}>
                <SuperCheckbox onChangeChecked={setRememberMe}>Remember me</SuperCheckbox>
            </div>
            <div>
                <div className={s.wrapper_submit_button}>
                    <SuperButton onClick={logInHandler} disabled={isLoggedIn}>Submit</SuperButton>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;
