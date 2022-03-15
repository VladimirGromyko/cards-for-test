import React, {useCallback} from 'react'
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import s from "../../../header/header.module.css";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../routes/Paths";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {ResponseErrorStateType} from "../../../../m2-bll/errorReducer";
import {errorResponse} from "../../../../../n2-features/f0-test/errorResponse";
import {log} from "util";

const EditPack = () => {
    const errorRes = useSelector<AppStoreType, ResponseErrorStateType>(state => state.error)
    // debugger
    const isShownEditPack = useSelector<AppStoreType, boolean>((state: AppStoreType) =>
        state.packs.isShownEditPack)

    const OnCancelClick = useCallback(() => {
    }, [])
    // dispatch()
    const OnSaveClick = useCallback(() => {
        // dispatch()
    }, [])

    // errorRes.isResponseError && console.log(errorRes.errorMessage)
    // errorRes.isResponseError && console.log(errorResponse(errorRes, ''))

    return <div>
        {isShownEditPack
            ? (
                <>
                    <nav>
                        <ul className={s.menu}>
                            <li className={``}>
                                <NavLink to={PATH.PACKS} className={''}>Pack List</NavLink>
                            </li>
                            <li className={``}>
                                <NavLink to={PATH.PROFILE} className={''}>Profile Page</NavLink>
                            </li>
                        </ul>
                    </nav>


                    <h2>Packs info</h2>
                    {errorRes.isResponseError
                        ? (
                            <div>
                                <span style={{color: 'red'}}>{errorResponse(errorRes, 'editPack')}</span>
                            </div>)
                        :
                        (<div>
                            <span>Question</span>
                            <div>What ...?</div>
                            <span>Answer</span>
                            <div>Bla, bla...</div>
                            <SuperButton onClick={OnCancelClick}>Cancel </SuperButton>
                            <SuperButton onClick={OnSaveClick}>Save</SuperButton>
                        </div>)
                    }
                </>
            )
            : <Navigate to={PATH.PACKS}/>
        }
    </div>
}

export default EditPack
