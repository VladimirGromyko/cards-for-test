import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import s from './Registration.module.css'
import l from "../../common/c7-Loading/loader07.module.css";
import {AppStoreType} from "../../../m2-bll/store";
import {LoadingStatusType} from "../../../m2-bll/loadingReducer";
import {registrationTC, setRegisteredAC} from "../../../m2-bll/registerReducer";
import {PATH} from "../../routes/Paths";
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";


const Registration = () => {
    const isRegistred = useSelector<AppStoreType>(state => state.register.isRegistered)
    const err = useSelector<AppStoreType>(state => state.register.error)
    const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')


    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPass(e.currentTarget.value)
    }
    const onConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPass(e.currentTarget.value)

    }
    const onRegisterClick = () => {
        if (pass === confirmPass) {
            dispatch(registrationTC(email, pass))
        }
    }

    useEffect(() => {
        if (isRegistred) {
            dispatch(setRegisteredAC(false))
            navigate(PATH.LOGIN)
        }
    }, [dispatch, isRegistred, navigate])

    return (
        <div className={s.wrapper}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <div className={s.container}>
                <h1 className={s.title}>Sign up</h1>
                <div className={s.containerForEmail}>
                    <div className={s.textField}>
                        <label className={s.label}>Email</label>
                        <SuperInputText className={s.input} type="text" placeholder="Email" onChange={onEmailChange}/>
                    </div>
                </div>
                <div className={s.textField}>
                    <label className={s.label}>Password</label>
                    <SuperInputText className={s.input} type="text" placeholder="Password" onChange={onPassChange}/>
                </div>
                <div className={s.textField}>
                    <label className={s.label}>Confirm password</label>
                    <SuperInputText className={s.input} type="text" placeholder="Confirm password"
                                    onChange={onConfirmPassChange}/>
                </div>
                <SuperButton onClick={onRegisterClick} className={s.button}>Register</SuperButton>
                {err}
            </div>
        </div>
    )
}

export default Registration
