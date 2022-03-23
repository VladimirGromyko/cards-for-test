import React from 'react'
import { NavLink } from 'react-router-dom'
import {PATH} from "../routes/Paths";
import s from '../header/header.module.css'
import {logoutUserTC} from "../../m2-bll/loginReducer";
import {useDispatch} from "react-redux";

function Header() {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        dispatch(logoutUserTC())
    }

    return (
        <div>
            <nav>
                <ul className={s.menu}>
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PROFILE} className={''}>ProfilePage</NavLink>*/}
                    {/*</li>*/}
                    <li className={``}>
                        <NavLink to={PATH.PACK_LIST} className={''}>Pack list</NavLink>
                    </li>
                    <li className={``}>
                        <NavLink to={PATH.TEST} className={''}>Profile</NavLink>
                    </li>

                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.MAIN} className={''}>Main</NavLink>*/}
                    {/*</li>*/}
                    <li className={``}>
                        <NavLink to={PATH.LOGIN} className={''}>Login</NavLink>
                    </li>
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.CHANGE_PASSWORD} className={''}>Change Password</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PASSWORD_RECOVERY} className={''}>Password Recovery</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.REGISTRATION} className={''}>Registration</NavLink>*/}
                    {/*</li>*/}
                    <li className={``}>
                        <NavLink to={''} className={''} onClick={logOutHandler}>LogOut</NavLink>
                    </li>
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PACKS} className={''}>Packs</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </nav>
        </div>
    )
}

export default Header
