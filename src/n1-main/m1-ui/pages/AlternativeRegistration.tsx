import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { registrationTC, setRegistredAC } from '../../m2-bll/registerReducer'
import { AppStoreType } from '../../m2-bll/store'
import { registerAPI } from '../../m3-dal/registerAPI'
import SuperButton from '../common/c1-SuperButton/SuperButton'
import { PATH } from '../routes/Paths'
import s from './Registration.module.css'

const AlternativeRegistration =() => {
    const isRegistred = useSelector<AppStoreType>(state=> state.register.isRegistred)
    const err = useSelector<AppStoreType>(state => state.register.error)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    

    const onEmailChange = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onPassChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPass(e.currentTarget.value)
    }
    const onConfirmPassChange = (e:ChangeEvent<HTMLInputElement>) => {
        setConfirmPass(e.currentTarget.value)

    }
    const onRegisterClick = () => {
        if (pass === confirmPass){
            dispatch(registrationTC(email, pass))
        }
    }

    if (isRegistred){
        dispatch(setRegistredAC(false))
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.wrapper}>
            <h1 className={s.title}>Sign up</h1>
            <div className={s.textField}>
                <label className={s.label}>Email</label>
                <input className={s.input} type="text"  placeholder="Email" onChange={onEmailChange}/>
            </div>
            <div className={s.textField}>
                <label className={s.label}>Password</label>
                <input className={s.input} type="text" placeholder="Password" onChange={onPassChange}/>
            </div>
            <div className={s.textField}>
                <label className={s.label}>Confirm password</label>
                <input className={s.input} type="text" placeholder="Confirm password" onChange={onConfirmPassChange}/>
            </div>
            <SuperButton onClick={onRegisterClick} className={s.button}>Register</SuperButton>
            {err}
        </div>
    )
}

export default AlternativeRegistration
