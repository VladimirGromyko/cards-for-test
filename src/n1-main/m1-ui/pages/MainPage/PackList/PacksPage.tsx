import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {ChangeEvent, useEffect,useCallback, useState} from "react";
import commonPacksStyle from "./PacksPage.module.css"
import SuperInputText from "../../../common/c2-SuperInput/SuperInputText";
import {PacksTable} from "./PacksTable";
import {AppStoreType} from "../../../../m2-bll/store";
import Sidebar from "./Sidebar";
import {HeaderPacks} from "./HeaderPacks";
import l from "../../../common/c7-Loading/loader07.module.css";
import {
    addPacksTC, deletePackTC,
    editPackTC, getSearchPackByNameTC,
    pickDeletePackAC,
    pickEditPackAC, setCurrentPageTC,
    setPacksDataTC,
    showAddPackAC, showDeletePackAC,
    showEditPackAC,
} from "../../../../m2-bll/packsReducer";
import {PacksGetResponseDataType} from "../../../../m3-dal/packs-api";
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";
import useDebounce from "../../../../../n2-features/f1-hooks/useDebounce";
import {PATH} from "../../../routes/Paths";
import {initializeMainTC} from "../../../../m2-bll/loginReducer";
import {LearnPage} from "../../learn/LearnPage";
import ModalAddContainer from "../../../../../n2-features/f3-utils/Modal/ModalAddContainer";


export const PacksPage = () => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const packs = useSelector<AppStoreType, PacksGetResponseDataType>(state => state.packs.packsData)
    const searchRX = useSelector<AppStoreType, string | undefined>(state => state.packs.packName)
    const currentPage = useSelector<AppStoreType, number>(state => state.packs.currentPage)
    // const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.packsData.cardPacks)
    const user = useSelector<AppStoreType>(state => state.login.user)
    // const updatedCardsPack = useSelector<AppStoreType, {}>(state => state.packs.updatedCardsPack)
    const [selectedAll, setSelectedAll] = useState<boolean>(false)

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


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false);

    const debouncedValue = useDebounce(search, 1500);

    useEffect(() => {
          if (debouncedValue !== searchRX) {
            setIsSearching(true);
                dispatch(getSearchPackByNameTC(search))
          }
        },
        [debouncedValue]
      );

    const onSearchHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }
    // useEffect(()=>{
    //     dispatch(initializeMainTC())
    // },[])
    // useEffect(()=>{

    // },[])

    const onSetAllPressHandler = useCallback(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN)
        }
        setSelectedAll(false)
        dispatch(setPacksDataTC({
            // briefly hardcoded 1 Cards request
            params: {
                packName: '',
                pageCount: 20,
            }
        }))
    }, [dispatch])

    const onSetMyPressHandler = useCallback(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN)
        }
        setSelectedAll(true)
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

// Block for Add pack
    const addPack = useCallback((pack: string) => {
        dispatch(addPacksTC({cardsPack: {name: pack}}))
    }, [dispatch,])

    const showAddPack = (value: boolean) => {
        dispatch(showAddPackAC(value))
    }
//-------------

// Block for Delete pack
    const deletePackList = useCallback((packName: string, packId: string) => {
        dispatch(pickDeletePackAC(packName, packId))
        dispatch(showDeletePackAC(true))
    }, [dispatch])

    const deletePack = useCallback((packName: string, packId: string) => {
        dispatch(deletePackTC({params: {id: packId}}))
    }, [dispatch])

    const showDeletePack = useCallback((value: boolean) => {
        dispatch(showDeletePackAC(value))
    },[dispatch])
//-------------

// Block for Edit pack
    const editPackList = useCallback((packName: string, packId: string) => {
        dispatch(pickEditPackAC(packName, packId))
        dispatch(showEditPackAC(true))
    }, [dispatch])

    const editPack = useCallback((packId: string, namePack: string) => {
        dispatch(editPackTC({cardsPack: {_id: packId, name: namePack}}))
    }, [dispatch])

    const showEditPack = useCallback((value: boolean) => {
        dispatch(showEditPackAC(value))
    }, [dispatch])
//-------------

    const learnPack = useCallback((packId: string) => {
        // navigate('/packs/' + packId)
        navigate('/main/packs-learn/'+ packId)
    }, [navigate])

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageTC(pageNumber))
    }
    if (!isLoggedIn) {
        navigate(PATH.LOGIN)
    }

    return (
        <div className={commonPacksStyle.wrapper}>


            <div className={commonPacksStyle.TableWrapper}>
                <div style={{width: '100%'}}>
                    {isLoading === "loading" && <div className={l.loader07}></div>}
                </div>
                {/*ЛЕВАЯ СТОРОНА*/}
                <div className={commonPacksStyle.ariaA}>
                    <div style={{textAlign: 'start', marginBottom: '7px'}}
                         className={commonPacksStyle.contentAllMy}>
                        <h3>Show Packs cards</h3>
                        <div className={commonPacksStyle.allMyWrapper}>
                            <div className={ selectedAll ? commonPacksStyle.all :  commonPacksStyle.my} onClick={onSetMyPressHandler}><p>My</p></div>
                            <div className={ !selectedAll ? commonPacksStyle.all :  commonPacksStyle.my} onClick={onSetAllPressHandler}><p>All</p></div>
                            </div>
                        <div style={{color: 'red'}}>
                            {errorResponse(errorRes, 'setPacks')}
                        </div>
                    </div>
                    <div>
                        <Sidebar/>
                    </div>
                </div>
                {/*ПРАВАЯ СТОРОНА*/}

                <span className={commonPacksStyle.content}>
                    <div style={{textAlign: 'start', marginBottom: '7px'}}>Packs list</div>
                    <div className={commonPacksStyle.inputPlusButton}>
                        <SuperInputText style={{width: '76%'}} placeholder='Enter cardPacks name for searching'
                                        onChange={onSearchHandler}/>
                        <span>
                              <div>
                                  <ModalAddContainer
                                      addPack={addPack}
                                      showPack={showAddPack}
                                      isLoading={isLoading}
                                      isShownPack={isShownAddPack}
                                  />
                              </div>
                        </span>
                    </div>

                    <HeaderPacks/>
                    {packs && <PacksTable
                        deletePack={deletePack}
                        deletePackList={deletePackList}
                        showDeletePack={showDeletePack}
                        deletePackId={pickedDeletePack.packId}
                        deletePackName={pickedDeletePack.packName}
                        editPack={editPack}
                        editPackList={editPackList}
                        showEditPack={showEditPack}
                        editPackId={pickedEditPack.packId}
                        editPackName={pickedEditPack.packName}
                        learnPack={learnPack}
                        packs={packs}
                        isLoading={isLoading}
                        isShownEditPack={isShownEditPack}
                        isShownDeletePack={isShownDeletePack}
                        currentPage={currentPage}
                        onPageChanged={onPageChanged}
                    />}
                </span>
            </div>
        </div>

    )
}