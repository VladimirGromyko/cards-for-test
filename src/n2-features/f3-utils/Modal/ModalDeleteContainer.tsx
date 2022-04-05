import React, {useState} from 'react';
import ModalQuestion from "./ModalQuestion";
import {LoadingStatusType} from "../../../n1-main/m2-bll/loadingReducer";
import {DeletePack} from "../../../n1-main/m1-ui/pages/MainPage/PackList/DeletePack";


type ModalDeleteContainerType = {
    deletePack: (packName: string, pack: string) => void
    deletePackId: string
    deletePackName: string
    showPack: (value: boolean) => void
    isLoading: LoadingStatusType
    isShownPack: boolean
}

const ModalDeleteContainer: React.FC<ModalDeleteContainerType> = (
    {
        deletePack,
        deletePackId,
        deletePackName,
        showPack,
        isLoading,
        isShownPack,
        children
    }) => {
    // const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState(false);

    const setTrue = () => {
        setAnswer(true);
        showPack(false)
    };
    const setFalse = () => {
        setAnswer(false);
        showPack(false)
    };
    // answer && addPack('My pack for new day')


    return (
        <>

            <ModalQuestion
                show={isShownPack}
                // show={isShownAddPack}
                // show={show}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={() => showPack(false)}
                // backgroundOnClick={() => hideAddPack(false)}
                // backgroundOnClick={() => setShow(false)}

                width={300}
                height={300}
            >
                <DeletePack deletePack={deletePack}
                            deletePackId={deletePackId}
                            deletePackName={deletePackName}
                            isLoading={isLoading}
                            setFalse={setFalse}/>
            </ModalQuestion>

        </>
    )
        ;
};

export default ModalDeleteContainer;