import {useDispatch, useSelector} from "react-redux";
import React from "react";
import commonPacksStyle from "./PacksPage.module.css"
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import {PacksTable} from "./PacksTable";
import {AppStoreType} from "../../../m2-bll/store";
import Sidebar from "./Sidebar";
import {HeaderPacks} from "./HeaderPacks";
import Pagination from "../../common/c8-Pagination/Pagination";


export const PacksPage = () => {
    const dispatch = useDispatch();

    // const packName = useSelector((state: AppStoreType) => state.packs.packName);
    const status = useSelector((state: AppStoreType) => state.loading.isLoading);
    const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);

    // useEffect(() => {
    //     // dispatch(fetchPacksTC());
    // }, [packName]);

    // if (!isLoggedIn) {
    //     return <Navigate to={PATH.LOGIN}/>;
    // }

    return (
        <>
            {status === "loading" ? (
                <div>Loading...</div>
            ) : (
                <div className={commonPacksStyle.wrapper}>

                    <div className={commonPacksStyle.content}>
                        <Sidebar/>
                    </div>
                    <div className={commonPacksStyle.content}>
                        <div>Packs</div>
                        <SuperInputText placeholder='Enter packs name for searching'/>

                        <div>
                            <Pagination/>
                        </div>

                        <HeaderPacks/>

                        <PacksTable/>
                        <div>
                            <Pagination/>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}