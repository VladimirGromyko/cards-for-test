import React, {useCallback, useEffect} from 'react'
import {PATH} from "../../../routes/Paths";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {PacksGetResponseDataType} from "../../../../m3-dal/packs-api";
import {NavLink, useNavigate} from "react-router-dom";
import {setPacksDataTC, showMainPageAC} from "../../../../m2-bll/packsReducer";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import l from "../../../common/c7-Loading/loader07.module.css";
import {LoadingStatusType} from "../../../../m2-bll/loadingReducer";
import s from "../../../header/header.module.css";


const PackList = () => {
    const isShownMainPage = useSelector<AppStoreType, boolean>(state => state.packs.isShownMainPage)
    const packsData = useSelector<AppStoreType, PacksGetResponseDataType>(state => state.packs.packsData)

    const isLoading = useSelector<AppStoreType, LoadingStatusType>(state => state.loading.isLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        packsData.cardPacks && dispatch(showMainPageAC(true))
    }, [isShownMainPage])

    const onSetAllPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({

            // briefly hardcoded 1 Cards request
            params: {
                //packName: 'english',
                pageCount: 10
            }
        }))
    }, [dispatch, setPacksDataTC])

    const onSetMyPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({

            // briefly hardcoded 1 Cards request
            params: {
                packName: '',
                pageCount: 10,
                user_id: '622af9b229bee90004696543'
            }
        }))
    }, [dispatch, setPacksDataTC])


    const onDeletePressHandler = useCallback(() => {
        // dispatch()
    }, [])
    const onEditPressHandler = useCallback(() => {
        navigate(PATH.CARDS)
        // dispatch()
    }, [])
    // dispatch()
    const onLearnPressHandler = useCallback(() => {
        // dispatch()
        navigate(PATH.PACK_LIST_LEARN)
    }, [])


    return <div>
        <nav>
            <ul className={s.menu}>
                <li className={``}>
                    <NavLink to={PATH.PACKS} className={''}> PackList </NavLink>
                </li>
                <li className={``}>
                    <NavLink to={PATH.PROFILE} className={''}>ProfilePage</NavLink>
                </li>
            </ul>
        </nav>

        <div>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>

            <div>
                <SuperButton onClick={onSetAllPressHandler}>All packs</SuperButton>
                <SuperButton onClick={onSetMyPressHandler}>My packs</SuperButton>
            </div>
            <h3>Pack List</h3>

            {packsData.cardPacks &&
            <div>
                {packsData.cardPacks[0].name} created {packsData.cardPacks[0].created}
            </div>
            }

            <div>
                <button onClick={onDeletePressHandler}>Delete</button>
            </div>
            <div>
                <button onClick={onEditPressHandler}>Edit</button>
            </div>
            <div>
                <button onClick={onLearnPressHandler}>Learn</button>
            </div>
            <div>
                <NavLink to={'/packs/623056734348a50004eb4dc3'}>cards</NavLink>
            </div>
        </div>

    </div>
}

export default PackList
