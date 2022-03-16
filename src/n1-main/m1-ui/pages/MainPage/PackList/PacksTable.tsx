import React from "react";
import {PackItem} from "./PackItem";
import {CardPacksType} from "../../../../m3-dal/packs-api";
import l from "../../../common/c7-Loading/loader07.module.css";
import EditPack from "./EditPack";
import {LoadingStatusType} from "../../../../m2-bll/loadingReducer";

type PacksTableType = {
    deletePack: (userId: string, packId: string) => void
    editPack: (packId: string, namePack: string) => void
    pickEditPack: (packName: string, packId: string) => void
    packId: string
    packName: string
    learnPack: (packId: string) => void
    cardPacks: CardPacksType[]
    isLoading: LoadingStatusType
    isShownEditPack: boolean
    hideEditPack: () => void
}


export const PacksTable = ({
                               deletePack, editPack, pickEditPack, packId, packName, learnPack,
                               cardPacks, isLoading, isShownEditPack, hideEditPack
                           }: PacksTableType) => {

    return (
        <div>
            {isLoading === "loading" && <div className={l.loader07}></div>}
            {isShownEditPack ? (
                    <EditPack
                        editPack={editPack}
                        packId={packId}
                        packName={packName}
                        hideEditPack={hideEditPack}
                    />)
                : (cardPacks.map((pack) => {
                    return <PackItem key={pack._id}
                                     deletePack={deletePack}
                                     pickEditPack={pickEditPack}
                                     learnPack={learnPack}
                                     pack={pack}
                    />
                }))
            }
        </div>
    )
}