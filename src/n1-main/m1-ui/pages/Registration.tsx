import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { registrationTC, setRegistredAC } from '../../m2-bll/registerReducer'
import { AppStoreType } from '../../m2-bll/store'
import SuperButton from '../common/c1-SuperButton/SuperButton'
import { PATH } from '../routes/Paths'

const Registration =() => {
    const isRegistred = useSelector<AppStoreType>(state=> state.register.isRegistred)
    const err = useSelector<AppStoreType>(state => state.register.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            dispatch(registrationTC(email, pass1))
        }
    }
    // if (isRegistred){
    //     dispatch(setRegistredAC(false))
    //     return <Navigate to={PATH.LOGIN}/>
    // }
    useEffect(() => {
        if (isRegistred) {
            dispatch(setRegistredAC(false))
            navigate(PATH.LOGIN)
        }
    }, [isRegistred, navigate])
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
