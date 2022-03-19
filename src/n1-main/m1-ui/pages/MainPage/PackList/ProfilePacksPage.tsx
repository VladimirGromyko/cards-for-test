import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";
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
    pickEditPackAC, setCurrentPage,
    setPacksDataTC,
    showAddPackAC, showDeletePackAC,
    showEditPackAC
} from "../../../../m2-bll/packsReducer";
import {PacksGetResponseDataType} from "../../../../m3-dal/packs-api";
import {CardPacksType} from "../../../../m3-dal/packs-api";
import s from '../../../header/header.module.css';
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";
import {AddPack} from "./AddPack";


export const ProfilePacksPage = () => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    // const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const packs = useSelector<AppStoreType, PacksGetResponseDataType>(state => state.packs.packsData)
    const currentPage = useSelector<AppStoreType, number>(state => state.packs.currentPage)
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.packsData.cardPacks)
    const user = useSelector<AppStoreType>(state => state.login.user)
    // const updatedCardsPack = useSelector<AppStoreType, {}>(state => state.packs.updatedCardsPack)

    const isShownAddPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownAddPack)

    const isShownEditPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownEditPack)

    const isShownDeletePack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownDeletePack)

    const pickedEditPack = useSelector<AppStoreType, { packName: string, packId: string }>
    ((state: AppStoreType) => state.packs.pickedEditPack)

    const pickedDeletePack = useSelector<AppStoreType, { packName: string, packId: string }>
    ((state: AppStoreType) => state.packs.pickedDeletePack)
    // pickedDeletePack)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const onSetAllPressHandler = useCallback(() => {
    //     dispatch(setPacksDataTC({
    //         // briefly hardcoded 1 Cards request
    //         params: {
    //             packName: '',
    //             pageCount: 100
    //         }
    //     }))
    // }, [dispatch])

    const onSetMyPressHandler = useCallback(() => {
        dispatch(setPacksDataTC({
            // briefly hardcoded 1 Cards request
            params: {
                // packName: 'english',
                // pageCount: 5,
                // user_id: "622af9b229bee90004696543"
                // @ts-ignore
                user_id: user._id
            }
        }))

    }, [dispatch,])

    const addPackList = useCallback(() => {
        dispatch(showAddPackAC(true))
    }, [dispatch])

    const addPack = useCallback((pack: string) => {
        dispatch(addPacksTC({cardsPack: {name: pack}}))
        // dispatch(showEditPackAC(true))
        // console.log('New pack: ', pack)
    }, [dispatch,])

    const hideAddPack = () => {
        dispatch(showAddPackAC(false))
    }
    const deletePackList = useCallback((packName: string, packId: string) => {
        dispatch(pickDeletePackAC(packName, packId))
        dispatch(showDeletePackAC(true))
        // console.log("Удалить у самурая : ", userId, "колоду с Id: ", packId)
        // dispatch()
    }, [dispatch])
    const deletePack = useCallback((packName: string, packId: string) => {
        console.log("Удалить колоду:", packName, " с Id: ", packId)
        // dispatch()
    }, [])
    const hideDeletePack = () => {
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

    const hideEditPack = useCallback(() => {
        dispatch(showEditPackAC(false))
    }, [dispatch])

    const learnPack = useCallback((packId: string) => {
        navigate('/packs/' + packId)
        // navigate(PATH.CARDS+packId)
    }, [navigate])

    const OnGoToEditPageOnClickHandler = () => {
        // navigate('/edit')
    }

    const onPageChanged = (pageNumber: number) => {
        console.log("pageNumber: ", pageNumber)
        dispatch(setCurrentPage(pageNumber))
    }

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
                    {/*<li>*/}
                    {/*    <NavLink to={`/packs/623056734348a50004eb4dc3`}>cards</NavLink>*/}
                    {/*</li>*/}
                </ul>

            </nav>
            <div>
                <div className={commonPacksStyle.content}>
                    <img className={s.photo}
                         src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c7caa60f60d75f36e2b2567904bba2cca3cbf48c_full.jpg"
                         alt="UserPhoto"/>
                    <div className={s.inputTitle}>Nickname</div>
                    <SuperButton onClick={OnGoToEditPageOnClickHandler} >Edit profile</SuperButton>
                </div>

                <div className={commonPacksStyle.content}>
                    <Sidebar/>
                </div>
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
                {packs && !isShownAddPack && <PacksTable
                    deletePack={deletePack}
                    deletePackList={deletePackList}
                    hideDeletePack={hideDeletePack}
                    deletePackId={pickedDeletePack.packId}
                    deletePackName={pickedDeletePack.packName}
                    editPack={editPack}
                    editPackList={editPackList}
                    hideEditPack={hideEditPack}
                    packId={pickedEditPack.packId}
                    packName={pickedEditPack.packName}
                    learnPack={learnPack}
                    packs={packs}
                    isLoading={isLoading}
                    isShownEditPack={isShownEditPack}
                    isShownDeletePack={isShownDeletePack}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                />}
            </div>
        </div>

    )
}