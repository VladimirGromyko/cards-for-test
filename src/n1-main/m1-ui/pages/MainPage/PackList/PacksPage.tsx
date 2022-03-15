import {useDispatch, useSelector} from "react-redux";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import React, {useCallback} from "react";
import commonPacksStyle from "./PacksPage.module.css"
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
import {PacksTable} from "./PacksTable";
import {AppStoreType} from "../../../../m2-bll/store";
import Sidebar from "./Sidebar";
import {HeaderPacks} from "./HeaderPacks";
import {PATH} from "../../../routes/Paths";
import l from "../../../common/c7-Loading/loader07.module.css";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {editPackTC, setPacksDataTC} from "../../../../m2-bll/packsReducer";
import {CardPacksType} from "../../../../m3-dal/packs-api";
import s from '../../../header/header.module.css';
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";


export const PacksPage = () => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.packsData.cardPacks)
    const updatedCardsPack = useSelector<AppStoreType, {}>(state => state.packs.updatedCardsPack)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isShownEditPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownEditPack)


    const onSetAllPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({

            // briefly hardcoded 1 Cards request
            params: {
                packName: '',
                pageCount: 15
            }
        }))
    }, [dispatch, setPacksDataTC])

    const onSetMyPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({

            // briefly hardcoded 1 Cards request
            params: {
                packName: 'english',
                pageCount: 5,
                user_id: ''
            }
        }))
    }, [dispatch, setPacksDataTC])

    const deletePack = useCallback((userId: string, packId: string) => {
        // console.log("Удалить у самурая : ", userId, "колоду с Id: ", packId)
        // dispatch()
    }, [])
    const editPack = useCallback((userId: string, packId: string) => {
        // console.log("Исправить у самурая : ", userId, "колоду с Id: ", packId)

        dispatch(editPackTC({cardsPack: {_id: packId}}))

        // isLoading === 'succeeded' && navigate(PATH.EDIT_PACK)


    }, [])
    // dispatch()
    const learnPack = useCallback((packId: string) => {
        // console.log("Изучить колоду с Id: ", packId)
        navigate(PATH.CARDS)
        // dispatch()
    }, [])

    return (
        <>
            {!isShownEditPack
                ? (

                    <div className={commonPacksStyle.wrapper}>
                        <div style={{width: '100%'}}>
                            {isLoading === "loading" && <div className={l.loader07}></div>}
                        </div>
                        <nav>
                            <ul className={s.menu}>
                                <li className={``}>
                                    <NavLink to={PATH.PACKS} className={''}>Pack list</NavLink>
                                </li>
                                <li className={``}>
                                    <NavLink to={PATH.PROFILE} className={''}>Profile</NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className={commonPacksStyle.content}>Show cardPacks card
                            <SuperButton onClick={onSetAllPressHandler}>All cardPacks</SuperButton>
                            <SuperButton onClick={onSetMyPressHandler}>My cardPacks</SuperButton>
                            <div style={{color: 'red'}}>
                                {errorResponse(errorRes, 'setPacks')}
                                {/*{errorRes.isResponseError && errorRes.pageOfError === 'changePas'*/}
                                {/*    ? 'Error: ' + errorRes.errorMessage*/}
                                {/*    : ''}*/}
                            </div>
                        </div>
                        <div className={commonPacksStyle.content}>Number of cards
                            <Sidebar/>
                        </div>
                        <div className={commonPacksStyle.content}>
                            <div>Packs</div>
                            <SuperInputText placeholder='Enter cardPacks name for searching'/>
                            <HeaderPacks/>
                            {cardPacks && <PacksTable
                                deletePack={deletePack}
                                editPack={editPack}
                                learnPack={learnPack}
                                cardPacks={cardPacks}
                            />}
                        </div>
                    </div>
                )
                : <Navigate to={PATH.EDIT_PACK}/>
            }

        </>
    )
}