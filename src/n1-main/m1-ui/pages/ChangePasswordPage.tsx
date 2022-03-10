import React, {useCallback, useEffect, useState} from 'react'
import SuperInputText from "../common/c2-SuperInput/SuperInputText";
import SuperButton from "../common/c1-SuperButton/SuperButton";
import l from "../common/c7-Loading/loader07.module.css";
import s from './PassRecovery.module.css';
import {resetNewPasswordTC, SendForgotPassStatusType} from "../../m2-bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/store";
import {useNavigate, useParams} from "react-router-dom";
import {PATH} from "../routes/Paths";
import {LoadingStatusType} from "../../m2-bll/loadingReducer";
import {ResponseErrorStateType} from "../../m2-bll/errorReducer";

const ChangePasswordPage = () => {
    const newPassStatus = useSelector<AppStoreType, SendForgotPassStatusType>(state => state.auth.isNewPassSet)
    const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (newPassStatus === 'succeeded') navigate(PATH.LOGIN)
    }, [newPassStatus, navigate])

    const param = useParams<'token'>()
    const resetPasswordToken = param.token

    const [password, setPassword] = useState<string>('')
    const onKeyPressHandler = useCallback(() => {
        dispatch(resetNewPasswordTC(password, resetPasswordToken))
    }, [dispatch, password, resetPasswordToken])

    return (
        <div>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <h2>Create new password</h2>
            <SuperInputText value={password}
                            onChangeText={setPassword}
                            onEnter={onKeyPressHandler}></SuperInputText>
            <div>
                {errorRes.isResponseError===true && <div  style={{color:"red"}}>
                    {'Error: ' + errorRes.errorMessage}
                </div>}
            </div>
            <div>Create new password and we will send you further instruction to email</div>
            <div>
                <SuperButton onClick={onKeyPressHandler} className={s.forgotButton}>Send instruction</SuperButton>
            </div>

        </div>
    )
}

export default ChangePasswordPage
