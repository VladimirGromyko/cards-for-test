import React, {useCallback, useState} from 'react'
import SuperInputText from "../common/c2-SuperInput/SuperInputText";
import SuperButton from "../common/c1-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/store";
import {authStateType, forgotTC} from "../../m2-bll/authReducer";


const PasswordRecoveryPage = () => {

    const instructionStatus = useSelector<AppStoreType, authStateType>(state => state.auth)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     if (instructionStatus.isInstructionEmailed==='failed') {
    //         return
    //     }
    //     dispatch(fetchTodoListsTC())
    // }, [dispatch, isLoggedIn])

    const [email, setEmail] = useState<string>('')

    const onKeyPressHandler = useCallback(() => {
        dispatch(forgotTC(email))
    }, [dispatch, email])

    console.log(instructionStatus.isInstructionEmailed)


    return (
        <div>
            <h2>Forgot you password ?</h2>
            <SuperInputText value={email}
                            onChangeText={setEmail}
                            onEnter={onKeyPressHandler}></SuperInputText>
            <div>Enter your email address and we will send you further instruction</div>
            <SuperButton onClick={onKeyPressHandler}>Send instruction</SuperButton>

            {instructionStatus.isInstructionEmailed === 'succeeded' && <div>
            <div>Check Email</div>
            <div>We've sent Email whith instruction to {email}</div>
        </div>}

        </div>
    )
}

export default PasswordRecoveryPage
