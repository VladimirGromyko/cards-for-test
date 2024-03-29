import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useCallback} from "react";
import commonPacksStyle from "./PacksPage.module.css"
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";

import {AppStoreType} from "../../../../m2-bll/store";
import Sidebar from "./Sidebar";
import {HeaderPacks} from "./HeaderPacks";

import l from "../../../common/c7-Loading/loader07.module.css";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {
    addPacksTC,
    editPackTC,
    pickDeletePackAC,
    pickEditPackAC, setCurrentPageTC,
    setPacksDataTC,
    showAddPackAC, showDeletePackAC,
    showEditPackAC
} from "../../../../m2-bll/packsReducer";
import {PacksGetResponseDataType} from "../../../../m3-dal/packs-api";
import {CardPacksType} from "../../../../m3-dal/packs-api";
import s from '../../../header/header.module.css';
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";



export const ProfilePacksPage = () => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const packs = useSelector<AppStoreType, PacksGetResponseDataType>(state => state.packs.packsData)
    const currentPage = useSelector<AppStoreType, number>(state => state.packs.currentPage)
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.packsData.cardPacks)
    const user = useSelector<AppStoreType, string | undefined>(state => state.login.user?.name)

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
        navigate('/edit')
    }

    const onPageChanged = (page: number) => {
        // console.log("pageNumber: ", pageNumber)
        dispatch(setCurrentPageTC({page, pageCount: 0}))
    }

    return (
        <div className={commonPacksStyle.wrapper}>

            {/*ЛЕВАЯ СТОРОНА*/}
            <div className={commonPacksStyle.TableWrapper}>
                <div style={{width: '100%'}}>
                    {isLoading === "loading" && <div className={l.loader07}></div>}
                </div>

                <div className={commonPacksStyle.ariaAForProfile}>
                    <div className={commonPacksStyle.editProfileWrapper}>
                        <div className={s.photo}>
                            <img
                                 src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c7caa60f60d75f36e2b2567904bba2cca3cbf48c_full.jpg"
                                 alt="UserPhoto"
                            />
                    </div>
                        <div className={s.inputTitle}>{user}</div>
                        <SuperButton onClick={OnGoToEditPageOnClickHandler}>Edit profile</SuperButton>
                </div>


                    <div>
                        <Sidebar/>
                    </div>
                </div>

                {/*ПРАВАЯ СТОРОНА*/}

                <span className={commonPacksStyle.content}>
                    <div style={{textAlign: 'start', marginBottom: '7px'}}>Packs list</div>
                    <div className={commonPacksStyle.inputPlusButton}>
                        <SuperInputText style={{width: '100%'}} placeholder='Enter cardPacks name for searching'/>
                    </div>
                    {/*{isShownAddPack && <AddPack*/}
                    {/*    addPack={addPack}*/}
                    {/*    // hideAddPack={hideAddPack}*/}
                    {/*    isLoading={isLoading}/>}*/}
                    <HeaderPacks/>
                    {/*{packs && !isShownAddPack && <PacksTable*/}
                    {/*    deletePack={deletePack}*/}
                    {/*    deletePackList={deletePackList}*/}
                    {/*    hideDeletePack={hideDeletePack}*/}
                    {/*    deletePackId={pickedDeletePack.packId}*/}
                    {/*    deletePackName={pickedDeletePack.packName}*/}
                    {/*    editPack={editPack}*/}
                    {/*    editPackList={editPackList}*/}
                    {/*    hideEditPack={hideEditPack}*/}
                    {/*    packId={pickedEditPack.packId}*/}
                    {/*    packName={pickedEditPack.packName}*/}
                    {/*    learnPack={learnPack}*/}
                    {/*    packs={packs}*/}
                    {/*    isLoading={isLoading}*/}
                    {/*    isShownEditPack={isShownEditPack}*/}
                    {/*    isShownDeletePack={isShownDeletePack}*/}
                    {/*    currentPage={currentPage}*/}
                    {/*    onPageChanged={onPageChanged}*/}
                    {/*/>}*/}
                </span>
            </div>
        </div>

    )
}
