import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { registrationTC, setRegistredAC } from '../../m2-bll/registerReducer'
import { AppStoreType } from '../../m2-bll/store'
import { registerAPI } from '../../m3-dal/registerAPI'
import SuperButton from '../common/c1-SuperButton/SuperButton'
import { PATH } from '../routes/Paths'

const Registration =() => {
    const isRegistred = useSelector<AppStoreType>(state=> state.register.isRegistred)
    const err = useSelector<AppStoreType>(state => state.register.error)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    

    const onEmailChange = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onPass1Change = (e:ChangeEvent<HTMLInputElement>) => {
        setPass1(e.currentTarget.value)
    }
    const onPass2Change = (e:ChangeEvent<HTMLInputElement>) => {
        setPass2(e.currentTarget.value)

    }
    const onRegisterClick = () => {
        if (pass1 === pass2){
            debugger
            dispatch(registrationTC(email, pass1))
        }
    }
    if (isRegistred){
        debugger
        dispatch(setRegistredAC(false))
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div>
            <span>Email</span>
            <input onChange={onEmailChange}/>
            <span>Password</span>
            <input onChange={onPass1Change}/>
            <span>Second Password</span>
            <input onChange={onPass2Change}/>
            <SuperButton onClick={onRegisterClick}>Register</SuperButton>
            {err}
        </div>
    )
}

export default Registration
