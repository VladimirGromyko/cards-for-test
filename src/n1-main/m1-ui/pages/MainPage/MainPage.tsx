import React, {useCallback, useEffect} from 'react'
import SuperButton from "../../common/c1-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";

import {setPacksDataTC, showMainPageAC} from "../../../m2-bll/packsReducer";
import {PacksGetResponseDataType} from "../../../m3-dal/packs-api";
import l from "../../common/c7-Loading/loader07.module.css";
import {LoadingStatusType} from "../../../m2-bll/loadingReducer";
import {useNavigate, Navigate} from "react-router-dom";
import {PATH} from "../../routes/Paths";


const MainPage = () => {
    const packsData = useSelector<AppStoreType, PacksGetResponseDataType>(state => state.packs.packsData)
    const isShownMainPage = useSelector<AppStoreType, boolean>(state => state.packs.isShownMainPage)
    const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)
    const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     packsData.cardPacks.length &&
    //     dispatch(showMainPageAC(true))
    // }, [])
    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN)
        } else return
    }, [])

    const onSetPressHandler = useCallback(() => {
        // dispatch(setPacksDataTC({
        //
        //     // briefly hardcoded 1 Cards request
        //     params: {packName: '', pageCount: 15}
        // }))
    }, [dispatch])

    const onProfilePressHandler = useCallback(() => {
            navigate(PATH.PROFILE)
        }
        , [navigate])


// what came from server
// packsData.cardPacks && console.log(packsData.cardPacks[0].name)
    return (
        <div>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            {isShownMainPage
                ? (
                    <div>
                        <h2>Main Page</h2>
                        <div style={{textAlign: "start"}}>Let's learn with test cards</div>
                        <div>
                            <SuperButton onClick={onSetPressHandler}>Show packs</SuperButton>
                            <br/>
                        </div>
                        <div style={{textAlign: "start"}}>View profile</div>

                        <div>
                            <SuperButton onClick={onProfilePressHandler}>Profile Page</SuperButton>
                        </div>
                    </div>
                )
                : (<Navigate to={PATH.PACKS}/>)
            }
        </div>
    )
}

export default MainPage
