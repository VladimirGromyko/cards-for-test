import React, {useCallback} from 'react'
import SuperButton from "../common/c1-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/store";

import {setPacksDataTC} from "../../m2-bll/packsReducer";
import {PacksDataType} from "../../m3-dal/packs-api";
import l from "../common/c7-Loading/loader07.module.css";
import {LoadingStatusType} from "../../m2-bll/loadingReducer";

const MainPage = () => {
    const packsData = useSelector<AppStoreType, PacksDataType>(state => state.packs.packsData)
    const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)
    const dispatch = useDispatch()
    const onKeyPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({}))
    }, [dispatch])

    return (
        <div>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <h2>Main Page</h2>
            <div>Let's learn with test cards</div>
            <div><SuperButton onClick={onKeyPressHandler}>Get packs with cards</SuperButton></div>
            {/*<div>{packsData}</div>*/}
        </div>
    )
}

export default MainPage
