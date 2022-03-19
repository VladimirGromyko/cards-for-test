import React from "react";
import {PackItem} from "./PackItem";
import {PacksGetResponseDataType} from "../../../../m3-dal/packs-api";
import l from "../../../common/c7-Loading/loader07.module.css";
import EditPack from "./EditPack";
import {LoadingStatusType} from "../../../../m2-bll/loadingReducer";
import {DeletePack} from "./DeletePack";
import Paginator from "../../../common/c9-Pagination/Paginator";

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
    packs: PacksGetResponseDataType
    isLoading: LoadingStatusType
    isShownEditPack: boolean
    isShownDeletePack: boolean
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


export const PacksTable = ({
                               deletePack, deletePackList, hideDeletePack, deletePackId,
                               deletePackName, editPack, editPackList, hideEditPack,
                               packId, packName, learnPack, packs, isLoading,
                               isShownEditPack, isShownDeletePack, currentPage, onPageChanged
                           }: PacksTableType) => {

    return (
        <div>
            {isLoading === "loading" && <div className={l.loader07}></div>}
            {isShownEditPack && !isShownDeletePack && (
                <EditPack
                    editPack={editPack}
                    packId={packId}
                    packName={packName}
                    hideEditPack={hideEditPack}
                    isLoading={isLoading}
                />)}
            {isShownDeletePack && !isShownEditPack &&
            (<DeletePack
                deletePack={deletePack}
                hideDeletePack={hideDeletePack}
                deletePackId={deletePackId}
                deletePackName={deletePackName}
                isLoading={isLoading}/>)}
            {!isShownEditPack && !isShownDeletePack &&
            (<>
                <Paginator cardPacksTotalCount={packs.cardPacksTotalCount} pageSize={10}
                           currentPage={currentPage} onPageChanged={onPageChanged} portionSize={undefined}/>

                {packs.cardPacks.map((pack) => {
                        return (

                            <PackItem key={pack._id}
                                      deletePackList={deletePackList}
                                      editPackList={editPackList}
                                      learnPack={learnPack}
                                      pack={pack}
                            />
                        )
                    }
                )}
            </>)
            }
        </div>
    )
}