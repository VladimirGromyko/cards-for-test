import React, {useEffect, useState} from 'react'
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import s from './LoginPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {PATH} from "../../routes/Paths";
import {getAuthUserDataTC} from "../../../m2-bll/loginReducer";
import l from "../../common/c7-Loading/loader07.module.css";
import {NavLink, useNavigate} from 'react-router-dom';
import eye_open from '../p4_utils/eye_open.png'
import eye_close from '../p4_utils/eye_close.png'

const LoginPage = () => {
    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [type, setType] = useState<string>('password')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const navigate = useNavigate()


    const logInHandler = () => {
        dispatch(getAuthUserDataTC(email, password, rememberMe))
    }
    const changeEmail = (e: string) => {
        setEmail(e)
    }
    const togglePassInput = () => {
        if (type === 'password') {
            setType('text')
            setTimeout(() => {
                setType('password')
            }, 2000);
        } else setType('password')
    }

    useEffect(() => {
        debugger
        if (isLoggedIn) {
            navigate(PATH.MAIN)
        } else return
    }, [navigate, isLoggedIn])


    return (
        <div className={s.superWrapper}>
            <div className={s.wrapper}>
                <div style={{width: '100%'}}>
                    {isLoading === "loading" && <div className={l.loader07}></div>}
                </div>
                <div className={s.container}>
                    <h4 className={s.title}>SIGN IN</h4>
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
                        <div className={s.passwordField}>
                            <SuperInputText type={type}
                                            value={password}
                                            placeholder={'Password'}
                                            onChangeText={setPassword}
                            />
                            <div onClick={togglePassInput} className={s.viewImage}>
                                {type === 'password'
                                    ? (<img src={eye_close} alt='eye_close' className={s.passView}/>)
                                    : (<img src={eye_open} alt='eye_open' className={s.passView}/>)
                                }
                            </div>
                        </div>

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
                    <div className={s.helpText}>Don't have an account?</div>
                    <div className={s.helpTextBold}><NavLink to={PATH.REGISTRATION}>Sign Up</NavLink></div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
