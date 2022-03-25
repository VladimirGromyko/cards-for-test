import React, {useState} from 'react';
import ModalQuestion from "./ModalQuestion";
import SuperButton from "../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import {LoadingStatusType} from "../../../n1-main/m2-bll/loadingReducer";
import {AddPack} from "../../../n1-main/m1-ui/pages/MainPage/PackList/AddPack";


type ModalQuestionContainerType = {
    addPack: (pack: string) => void
    hideAddPack: (value: boolean) => void
    isLoading: LoadingStatusType
    isShownAddPack: boolean
}

const ModalQuestionContainer: React.FC<ModalQuestionContainerType> = (
    {
        addPack, hideAddPack,
        isLoading, isShownAddPack, children
    }) => {
    // const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState(false);

    const setTrue = () => {
        setAnswer(true);
        hideAddPack(false)
        // setShow(false);
    };
    const setFalse = () => {
        setAnswer(false);
        hideAddPack(false)
        // setShow(false);
    };
    // answer && addPack('My pack for new day')


    return (
        <>
            <div>
                <SuperButton onClick={() => hideAddPack(true)}>Add new pack</SuperButton>
                {/*<SuperButton onClick={() => setShow(true)}>Add new pack</SuperButton>*/}
                {/*{answer ? <span>Yes</span> : <span>No</span>}*/}
            </div>

            <ModalQuestion
                show={isShownAddPack}
                // show={show}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={() => hideAddPack(false)}
                // backgroundOnClick={() => setShow(false)}

                width={300}
                height={500}
            >
                <AddPack addPack={addPack} isLoading={isLoading} setFalse={setFalse}/>
            </ModalQuestion>

        </>
    )
        ;
};

export default ModalQuestionContainer;