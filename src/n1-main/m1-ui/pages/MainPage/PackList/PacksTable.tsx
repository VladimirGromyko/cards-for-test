import React from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {PackItem} from "./PackItem";
import {CardPacksType} from "../../../../m3-dal/packs-api";
import l from "../../../common/c7-Loading/loader07.module.css";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../routes/Paths";
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";

type PacksTableType = {
    deletePack: (userId: string, packId: string) => void
    editPack: (userId: string, packId: string) => void
    learnPack: (packId: string) => void
    cardPacks: CardPacksType[]
}


export const PacksTable = ({deletePack, editPack, learnPack, cardPacks}: PacksTableType) => {
    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading)
    const isShownEditPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownEditPack)

    // console.log("isShownEditPack :", isShownEditPack)

    return (
        <div>
            {isLoading === "loading" && <div className={l.loader07}></div>}
            {cardPacks.map((pack) => {
                return <PackItem key={pack._id}
                                 deletePack={deletePack}
                                 editPack={editPack}
                                 learnPack={learnPack}
                                 pack={pack}/>
            })}
            {/*{isShownEditPack && <Navigate to={PATH.PACKS}/>}*/}
        </div>
    )
}