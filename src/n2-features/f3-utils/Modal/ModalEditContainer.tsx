import React, {useState} from 'react';
import ModalQuestion from "./ModalQuestion";
import {LoadingStatusType} from "../../../n1-main/m2-bll/loadingReducer";
import EditPack from "../../../n1-main/m1-ui/pages/MainPage/PackList/EditPack";



type ModalEditContainerType = {
    editPack: (packName: string, pack: string) => void
    editPackId: string
    editPackName: string
    showPack: (value: boolean) => void
    isLoading: LoadingStatusType
    isShownPack: boolean
}

const ModalEditContainer: React.FC<ModalEditContainerType> = (
    {
        editPack,
        editPackId,
        editPackName,
        showPack,
        isLoading,
        isShownPack,
        children
    }) => {

    const setTrue = () => {
        showPack(false)
    };
    const setFalse = () => {
        showPack(false)
    };

    return (
        <>

            <ModalQuestion
                show={isShownPack}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={() => showPack(false)}

                width={300}
                height={300}
            >
                <EditPack
                    editPack={editPack}
                    editPackId={editPackId}
                    editPackName={editPackName}
                    isLoading={isLoading}
                    setFalse={setFalse}
                />
            </ModalQuestion>

        </>
    )
        ;
};

export default ModalEditContainer;