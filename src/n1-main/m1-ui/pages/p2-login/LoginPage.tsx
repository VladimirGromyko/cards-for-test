import React, {useEffect, useState} from 'react'
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import s from './LoginPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {PATH} from "../../routes/Paths";
import {NavLink, useNavigate} from 'react-router-dom';
import {getAuthUserDataTC} from "../../../m2-bll/loginReducer";
import l from "../../common/c7-Loading/loader07.module.css";

// import {useNavigate} from "react-router-dom";

const LoginPage = () => {

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
            navigate(PATH.MAIN)
        } else return
    }, [navigate, isLoggedIn])


    return (<div className={s.superWrapper}>
            <div className={s.wrapper}>
                <div style={{width: '100%'}}>
                    {isLoading === "loading" && <div className={l.loader07}></div>}
                </div>
                <div className={s.container}>
                    <h4>SIGN IN</h4>
                    <div className={s.containerForEmail}>
                        <div className={s.textField}>
                            <div className={s.label}>Email</div>
                        </div>
                        <SuperInputText type={'email'}
                                        value={email}
                                        placeholder={'Enter email'}
                                        onChangeText={changeEmail}
                        />
                    </div>
                    <div className={s.containerForPassword}>
                        <div className={s.textField}>
                            <div className={s.label}>Password</div>
                        </div>

                        <SuperInputText type={'password'}
                                        value={password}
                                        placeholder={'Password'}
                                        onChangeText={setPassword}
                        />
                    </div>

                    {/*<div className={s.wrapper_submit_checkbox}>*/}
                    {/*    <SuperCheckbox onChangeChecked={setRememberMe}>Remember me</SuperCheckbox>*/}
                    {/*</div>*/}
                    {/*<div className={s.helpText}>Forgot password ?</div>*/}
                    <div className={s.helpTextForgotPasswordContainer}>
                        <NavLink to={PATH.PASSWORD_RECOVERY} className={s.helpTextForgotPassword}>Forgot
                            Password</NavLink>
                    </div>
                    <div>
                        <div className={s.wrapper_submit_button}>
                            <SuperButton onClick={logInHandler} disabled={isLoggedIn}>Submit</SuperButton>
                        </div>
                    </div>
                    {/*<div className={s.helpText}>Don't have an account?</div>*/}
                    <div className={s.helpText}>Don't have an account?</div>
                    <NavLink to={PATH.REGISTRATION} className={s.helpTextBold}>Sign Up</NavLink>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
