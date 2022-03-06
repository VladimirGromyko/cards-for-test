import React, { ChangeEvent, useState } from 'react'
import { registerAPI } from '../../m3-dal/registerAPI'
import SuperButton from '../common/c1-SuperButton/SuperButton'

const Registration =() => {
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
        registerAPI.registrationUser(email,pass1).then(res=>{
        }).catch(e=>{
        })
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
        </div>
    )
}

export default Registration
