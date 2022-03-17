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
import {
    addPacksTC,
    editPackTC,
    pickDeletePackAC,
    pickEditPackAC,
    setPacksDataTC,
    showAddPackAC, showDeletePackAC,
    showEditPackAC
} from "../../../../m2-bll/packsReducer";
import {CardPacksType} from "../../../../m3-dal/packs-api";
import s from '../../../header/header.module.css';
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";
import {AddPack} from "./AddPack";


export const PacksPage = () => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    // const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.packsData.cardPacks)
    // const updatedCardsPack = useSelector<AppStoreType, {}>(state => state.packs.updatedCardsPack)

    const isShownAddPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownAddPack)

    const isShownEditPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownEditPack)

    const isShownDeletePack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownDeletePack)

    const pickedEditPack = useSelector<AppStoreType, { packName: string, packId: string }>
    ((state: AppStoreType) => state.packs.pickedEditPack)

    const pickedDeletePack = useSelector<AppStoreType, {packName: string, packId: string }>
    ((state: AppStoreType) => state.packs.pickedDeletePack)
        // pickedDeletePack)

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
    }, [dispatch])

    const onSetMyPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({
            // briefly hardcoded 1 Cards request
            params: {
                // packName: 'english',
                // pageCount: 5,
                user_id: ""
            }
        }))
    }, [dispatch,])

    const addPackList = useCallback(() => {
        dispatch(showAddPackAC(true))
    },[dispatch])

    const addPack = useCallback((pack: string) => {
        dispatch(addPacksTC({cardsPack:{name:pack}}))
        // dispatch(showEditPackAC(true))
        // console.log('New pack: ', pack)
    }, [dispatch, ])

    const hideAddPack= () => {
        dispatch(showAddPackAC(false))
    }
    const deletePackList = useCallback((packName: string,packId: string) => {
        dispatch(pickDeletePackAC(packName, packId))
        dispatch(showDeletePackAC(true))
        // console.log("Удалить у самурая : ", userId, "колоду с Id: ", packId)
        // dispatch()
    }, [dispatch])
    const deletePack = useCallback((packName: string, packId: string) => {
        console.log("Удалить колоду:", packName," с Id: ", packId)
        // dispatch()
    }, [])
    const hideDeletePack= () => {
        dispatch(showDeletePackAC(false))
    }
    const editPackList = useCallback((packName: string, packId: string) => {
        dispatch(pickEditPackAC(packName, packId))
        dispatch(showEditPackAC(true))
    }, [dispatch])

    const editPack = useCallback((packId: string, namePack: string) => {
        dispatch(editPackTC({cardsPack: {_id: packId, name: namePack}}))
        // dispatch(showEditPackAC(true))
    }, [dispatch])

    const hideEditPack= useCallback(() => {
        dispatch(showEditPackAC(false))
    },[dispatch])

    const learnPack = useCallback((packId: string) => {
        navigate('/packs/'+packId)
        // navigate(PATH.CARDS+packId)
    }, [navigate])

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
                    <div><SuperButton onClick={addPackList}>Add new pack</SuperButton></div>
                    {isShownAddPack && <AddPack
                        addPack={addPack}
                        hideAddPack={hideAddPack}
                        isLoading={isLoading}/>}
                    <HeaderPacks/>
                    {cardPacks && <PacksTable
                        deletePack={deletePack}
                        deletePackList={deletePackList}
                        hideDeletePack={hideDeletePack}
                        deletePackId={pickedDeletePack.packId}
                        deletePackName={pickedDeletePack.packName}
                        editPack={editPack}
                        editPackList={editPackList}
                        hideEditPack = {hideEditPack}
                        packId={pickedEditPack.packId}
                        packName={pickedEditPack.packName}
                        learnPack={learnPack}
                        cardPacks={cardPacks}
                        isLoading={isLoading}
                        isShownEditPack={isShownEditPack}
                        isShownDeletePack={isShownDeletePack}

                    />}
                </div>
            </div>
    )
}