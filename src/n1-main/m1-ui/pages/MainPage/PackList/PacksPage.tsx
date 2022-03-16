import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
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
import {editPackTC, pickEditPackAC, setPacksDataTC, showEditPackAC} from "../../../../m2-bll/packsReducer";
import {CardPacksType} from "../../../../m3-dal/packs-api";
import s from '../../../header/header.module.css';
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";


export const PacksPage = () => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    // const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.packsData.cardPacks)
    // const updatedCardsPack = useSelector<AppStoreType, {}>(state => state.packs.updatedCardsPack)
    const isShownEditPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownEditPack)
    const pickedEditPack = useSelector<AppStoreType, { packName: string, packId: string }>
    ((state: AppStoreType) => state.packs.pickedEditPack)

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
    const pickEditPack = useCallback((packName: string, packId: string) => {

        dispatch(pickEditPackAC(packName, packId))
        dispatch(showEditPackAC(true))
    }, [dispatch, pickEditPackAC, showEditPackAC])

    const editPack = useCallback((packId: string, namePack: string) => {
        dispatch(editPackTC({cardsPack: {_id: packId, name: namePack}}))
        // dispatch(showEditPackAC(true))
    }, [dispatch, pickEditPackAC, showEditPackAC])

    const hideEditPack= () => {
        dispatch(showEditPackAC(false))
    }

    const learnPack = useCallback((packId: string) => {
        navigate(PATH.CARDS)
    }, [])

    return (
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
                        pickEditPack={pickEditPack}
                        packId={pickedEditPack.packId}
                        packName={pickedEditPack.packName}
                        learnPack={learnPack}
                        cardPacks={cardPacks}
                        isLoading={isLoading}
                        isShownEditPack={isShownEditPack}
                        hideEditPack = {hideEditPack}
                    />}
                </div>
            </div>
    )
}