import React, {useCallback} from 'react'
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import s from "../../../header/header.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../routes/Paths";

const EditPack = () => {

    const OnCancelClick = useCallback(() => {
    }, [])
    // dispatch()
    const OnSaveClick = useCallback(() => {
        // dispatch()
    }, [])


    return <div>
        <nav>
            <ul className={s.menu}>
                <li className={``}>
                    <NavLink to={PATH.PACK_LIST} className={''}>Pack List</NavLink>
                </li>
                <li className={``}>
                    <NavLink to={PATH.PROFILE} className={''}>Profile Page</NavLink>
                </li>
            </ul>
        </nav>


        <h2>Packs info</h2>

        <div>
            <span>Question</span>
            <div>What ...?</div>
            <span>Answer</span>
            <div>Bla, bla...</div>
            <SuperButton onClick={OnCancelClick}>Cancel </SuperButton>
            <SuperButton onClick={OnSaveClick}>Save</SuperButton>
        </div>

    </div>
}

export default EditPack
