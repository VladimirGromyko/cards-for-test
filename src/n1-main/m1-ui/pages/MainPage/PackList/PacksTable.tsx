import React from "react";
import {PackItem} from "./PackItem";
import {CardPacksType} from "../../../../m3-dal/packs-api";
import l from "../../../common/c7-Loading/loader07.module.css";
import EditPack from "./EditPack";
import {LoadingStatusType} from "../../../../m2-bll/loadingReducer";
import {DeletePack} from "./DeletePack";

type PacksTableType = {
    deletePack: (packName: string, pack: string) => void
    deletePackList: (packName: string, packId: string) => void
    hideDeletePack: () => void
    deletePackId: string
    deletePackName: string
    editPack: (packId: string, namePack: string) => void
    editPackList: (packName: string, packId: string) => void
    hideEditPack: () => void
    packId: string
    packName: string
    learnPack: (packId: string) => void
    cardPacks: CardPacksType[]
    isLoading: LoadingStatusType
    isShownEditPack: boolean
    isShownDeletePack: boolean
}


export const PacksTable = ({
                               deletePack, deletePackList, hideDeletePack, deletePackId,
                               deletePackName, editPack, editPackList, hideEditPack,
                               packId, packName, learnPack, cardPacks, isLoading,
                               isShownEditPack, isShownDeletePack
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
                        isLoading={isLoading}
                    />)
                : isShownDeletePack ?
                    (<DeletePack
                        deletePack={deletePack}
                        hideDeletePack={hideDeletePack}
                        deletePackId={deletePackId}
                        deletePackName={deletePackName}
                        isLoading={isLoading}/>)
                    : (cardPacks.map((pack) => {
                        return <PackItem key={pack._id}
                                         deletePackList={deletePackList}
                                         editPackList={editPackList}
                                         learnPack={learnPack}
                                         pack={pack}
                        />
                    }))
            }
        </div>
    )
}