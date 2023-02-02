import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
// import s from './Registration.module.css'
import s from './../p2-login/LoginPage.module.css'
import l from "../../common/c7-Loading/loader07.module.css";
import {AppStoreType} from "../../../m2-bll/store";
import {LoadingStatusType} from "../../../m2-bll/loadingReducer";
import {registrationTC, setRegisteredAC} from "../../../m2-bll/registerReducer";
import {PATH} from "../../routes/Paths";
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import eye_open from '../p4_utils/eye_open.png'
import eye_close from '../p4_utils/eye_close.png'


const Registration = () => {
    const isRegistred = useSelector<AppStoreType>(state => state.register.isRegistered)
    const err = useSelector<AppStoreType>(state => state.register.error)
    const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [type, setType] = useState<string>('password')
    const [confirmPass, setConfirmPass] = useState('')

    const onConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPass(e.currentTarget.value)

    }
    const onRegisterClick = () => {
        if (pass === confirmPass) {
            dispatch(registrationTC(email, pass))
        }
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
        if (isRegistred) {
            dispatch(setRegisteredAC(false))
            navigate(PATH.LOGIN)
        }
    }, [dispatch, isRegistred, navigate])

    return (
        <div className={s.superWrapper}>
            <div className={s.wrapper}>
                <div style={{width: '100%'}}>
                    {isLoading === "loading" && <div className={l.loader07}></div>}
                </div>
                <div className={s.container}>
                    <h4 className={s.title}>SIGN UP</h4>
                    <div className={s.containerForEmail}>
                        <div className={s.textField}>
                            <div className={s.label}>Email</div>
                        </div>
                        <SuperInputText type={'email'}
                                        value={email}
                                        placeholder={'Enter email'}
                                        onChangeText={setEmail}
                        />
                    </div>
                    <div className={s.containerForPassword}>
                        <div className={s.textField}>
                            <div className={s.label}>Password</div>
                        </div>
                        <div className={s.passwordField}>
                            <SuperInputText type={type}
                                            value={pass}
                                            placeholder={'Password'}
                                            onChangeText={setPass}
                            />
                            <div onClick={togglePassInput} className={s.viewImage}>
                                {type === 'password'
                                    ? (<img src={eye_close} alt='eye_close' className={s.passView}/>)
                                    : (<img src={eye_open} alt='eye_open' className={s.passView}/>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className={s.containerForPassword}>
                        <div className={s.textField}>
                            <div className={s.label}>Confirm password</div>
                        </div>
                        <div className={s.passwordField}>
                            <SuperInputText className={s.input} type={type} placeholder="Confirm password"
                                            onChange={onConfirmPassChange}/>
                            <div onClick={togglePassInput} className={s.viewImage}>
                                {type === 'password'
                                    ? (<img src={eye_close} alt='eye_close' className={s.passView}/>)
                                    : (<img src={eye_open} alt='eye_open' className={s.passView}/>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className={s.wrapper_submit_button}>
                        <SuperButton onClick={onRegisterClick} className={s.button}>Register</SuperButton>
                    </div>
                    {err}
                </div>
            </div>
        </div>
    )
}

export default Registration
