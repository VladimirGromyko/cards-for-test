import React, {useState} from 'react'
import SuperInputText from "../common/c2-SuperInput/SuperInputText";
import SuperButton from "../common/c1-SuperButton/SuperButton";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../../m2-bll/store";
// import {stateCardsType} from "../../m2-bll/cardsReducer";

// const newEmail = useSelector<AppStoreType, stateCardsType>(state => state.cards)
// const dispatch = useDispatch()

const PasswordRecoveryPage = () => {
    const [text, setText] = useState<string>('')
    const onKeyPressHandler = () => {
        console.log(text)
    }

    return (
        <div>
            <h2>Forgot you password ?</h2>
            <SuperInputText value={text}
                            onChangeText={setText}
                            onEnter={onKeyPressHandler}></SuperInputText>
            <div>Enter your email address and we will send you further instruction</div>
            <SuperButton onClick={onKeyPressHandler}>Send instruction</SuperButton>
        </div>
    )
}

export default PasswordRecoveryPage
