import {LoadingStatusType} from "../../../../m2-bll/loadingReducer"
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {useCallback} from "react";
import l from '../../../common/c7-Loading/loader07.module.css';
import s from "../../p3-pass-recovery/PassRecovery.module.css";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";


type DeletePackType = {
    deletePack: (packName: string, pack: string) => void
    hideDeletePack: () => void
    deletePackId: string
    deletePackName: string
    isLoading: LoadingStatusType
}
export const DeletePack = ({
                               deletePack, hideDeletePack, deletePackId,
                               deletePackName, isLoading
                           }: DeletePackType) => {

    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)

    const onDeleteClick = useCallback(() => {
        deletePack(deletePackName, deletePackId)
    }, [deletePack, deletePackId])

    const OnCancelClick = useCallback(() => {
        hideDeletePack()
    }, [hideDeletePack])


    return (
        <div className={s.wrapper}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <div>Delete Pack</div>
            <div>Do you really want to remove <b>Pack Name - {deletePackName}</b></div>
            <div>All cards well be excluded from this course</div>

            <SuperButton onClick={OnCancelClick}>Cancel</SuperButton>
            <SuperButton onClick={onDeleteClick} red={true}>Delete</SuperButton>
            <div>{errorResponse(errorRes, 'deletePack')}</div>
        </div>
    )
}