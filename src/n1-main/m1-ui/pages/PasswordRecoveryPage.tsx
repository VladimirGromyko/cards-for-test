import React, {useCallback, useState} from 'react'
import SuperInputText from "../common/c2-SuperInput/SuperInputText";
import SuperButton from "../common/c1-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/store";
import {authStateType, forgotTC} from "../../m2-bll/authReducer1";
import {PATH} from "../routes/Paths";
import {NavLink} from "react-router-dom";
import s from './PassRecovery.module.css';
import l from '../common/c7-Loading/loader07.module.css'
import {LoadingStatusType} from "../../m2-bll/loadingReducer";
import {ResponseErrorStateType} from "../../m2-bll/errorReducer";


const PasswordRecoveryPage = () => {

    const instructionStatus = useSelector<AppStoreType, authStateType>(state => state.auth1)
    const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const dispatch = useDispatch()


    const [email, setEmail] = useState<string>('')

    const onKeyPressHandler = useCallback(() => {
        dispatch(forgotTC(email))
    }, [dispatch, email])

    return (
        <div className={s.wrapper}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>

            <h3>Forgot you password ?</h3>
            <div className={s.inputField}>
                <SuperInputText value={email}
                                onChangeText={setEmail}
                                onEnter={onKeyPressHandler}
                                error={
                                    errorRes.isResponseError === true && errorRes.pageOfError === 'passwordRec'
                                        ? 'Error: ' + errorRes.errorMessage
                                        : ''
                                }
                                spanClassName={s.inputError}

                />
            </div>
            <div className={s.helpText}>Enter your email address and we will send you further instruction</div>
            <div className={s.forgotEmail}>
                {instructionStatus.isInstructionEmailed === 'succeeded' && <div>
                    <div>Check Email</div>
                    <div>We've sent Email with instruction to {email}</div>
                </div>}
            </div>
            <div><SuperButton onClick={onKeyPressHandler} className={s.forgotButton}>Send instruction</SuperButton>
            </div>
            <div className={s.helpText}>Did you remember your password ?</div>
            <NavLink to={PATH.LOGIN} className={''}>Try logging in</NavLink>

        </div>
    )
}

export default PasswordRecoveryPage
