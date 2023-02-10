import React from "react";
import {PackItem} from "./PackItem";
import {PacksGetResponseDataType} from "../../../../m3-dal/packs-api";
import l from "../../../common/c7-Loading/loader07.module.css";
import styles from "../../../common/c9-Pagination/Paginator.module.css";
import {LoadingStatusType} from "../../../../m2-bll/loadingReducer";
import Paginator from "../../../common/c9-Pagination/Paginator";
import ModalDeleteContainer from "../../../../../n2-features/f3-utils/Modal/ModalDeleteContainer";
import ModalEditContainer from "../../../../../n2-features/f3-utils/Modal/ModalEditContainer";
import {PackListSize} from "../../../common/c11-PackListSize/PackListSize";

type PacksTableType = {
    deletePack: (packName: string, pack: string) => void
    deletePackList: (packName: string, packId: string) => void
    showDeletePack: (value: boolean) => void
    deletePackId: string
    deletePackName: string
    editPack: (packId: string, namePack: string) => void
    editPackList: (packName: string, packId: string) => void
    showEditPack: (value: boolean) => void
    editPackId: string
    editPackName: string
    learnPack: (packId: string) => void
    packs: PacksGetResponseDataType
    isLoading: LoadingStatusType
    isShownEditPack: boolean
    isShownDeletePack: boolean
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    changePackListSize: (pageCount: number, page: number) => void
}


export const PacksTable = ({
                               deletePack, deletePackList, showDeletePack,
                               deletePackId,
                               deletePackName, editPack, editPackList, showEditPack,
                               editPackId, editPackName, learnPack, packs, isLoading,
                               isShownEditPack, isShownDeletePack,
                               currentPage, onPageChanged, changePackListSize
                           }: PacksTableType) => {

    return (
        <div>
            {isLoading === "loading" && <div className={l.loader07}></div>}

            <ModalEditContainer
                editPack={editPack}
                editPackId={editPackId}
                editPackName={editPackName}
                showPack={showEditPack}
                isLoading={isLoading}
                isShownPack={isShownEditPack}
            />

            <ModalDeleteContainer
                deletePack={deletePack}
                deletePackId={deletePackId}
                deletePackName={deletePackName}
                showPack={showDeletePack}
                isLoading={isLoading}
                isShownPack={isShownDeletePack}
            />

            <>

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
                <div className={styles.paginationWrapper}>
                    <Paginator cardPacksTotalCount={packs.cardPacksTotalCount}
                               pageCount={packs.pageCount}
                               pageSize={10}
                               currentPage={packs.page}
                               onPageChanged={onPageChanged}
                               portionSize={undefined}
                    />
                    <PackListSize changePackListSize={changePackListSize}
                                  pageCount={packs.pageCount}
                                  currentPage={packs.page}
                                  onPageChanged={onPageChanged}
                    />
                </div>

            </>
        </div>
    )
}
