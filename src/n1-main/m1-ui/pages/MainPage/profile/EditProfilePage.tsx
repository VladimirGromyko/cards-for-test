import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import s from './EditProfile.module.css';
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {changeUserNameTC} from "../../../../m2-bll/auth-reducer";
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from "../../../routes/Paths";
import {instance} from "../../../../m3-dal/instance";


export const EditProfilePage = () => {
    const userName = useSelector<AppStoreType, string | undefined>((state) => state.login.user?.name)
    const userEmail = useSelector<AppStoreType, string | undefined>((state) => state.login.user?.email)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const avatar = useSelector<AppStoreType, string>((state: AppStoreType) => state.auth.avatar)
    const inRef = useRef<HTMLInputElement>(null);

    const [code, setCode] = useState(false);
    const [file, setFile] = useState();
    const [fileURL, setFileURL] = useState();
    const [fileData, setFileData] = useState();
    const [base64, setBase64] = useState(true);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN)
        }
                else return
    }, [])

    const [nameFromInput, setNameFromInput] = useState<string>('')

    const onChangeNameHandler = () => {
        dispatch(changeUserNameTC(nameFromInput))
    }

    useEffect(() => {
        userName && setNameFromInput(userName)

    }, [userName])





    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        const reader = new FileReader();
        const formData = new FormData(); // for send to back

        const newFile = e.target.files && e.target.files[0];
        console.log(newFile)

        }
        // setFile(newFile)
        console.log(file)


    const send = () => {
        // dispatch(changeAvatarTC(file))

    };


    return (<div className={s.superWrapper}>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <h3>Personal Information</h3>
                    <img className={s.photo}
                         src={avatar}
                         alt="UserPhoto"/>

                    <input type="file" accept=".jpg, .jpeg, .png" multiple/>
                    <input
                        ref={inRef}
                        type={'file'}
                        style={{display: 'none'}}
                        onChange={upload}
                    />
                    <button onClick={send}>send</button>
                    <div className={s.containerForEmail}>
                        <div className={s.textField}>Nickname</div>
                        <div>
                            <SuperInputText
                                value={nameFromInput}
                                onChangeText={setNameFromInput}
                            />
                        </div>
                    </div>
                    <div className={s.containerForPassword}>
                        <div className={s.textField}>Email</div>
                        <div><SuperInputText value={userEmail}/></div>
                    </div>
                    <div className={s.button}><SuperButton onClick={onChangeNameHandler}>SAVE</SuperButton></div>
                </div>
            </div>
        </div>
    )
}


