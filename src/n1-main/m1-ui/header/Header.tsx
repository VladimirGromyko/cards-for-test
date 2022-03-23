import React, {useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {PATH} from "../routes/Paths";
import s from '../header/header.module.css'
import {logoutUserTC} from "../../m2-bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/store";
import SuperButton from "../common/c1-SuperButton/SuperButton";

function Header() {
    const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler = () => {
        dispatch(logoutUserTC())
    }
    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN)
        }
    }, [])
    const onPackListHandler = () => {
        if (!isLoggedIn) {
            return PATH.LOGIN
        } else return PATH.PACKS
    }

    const onProfileHandler = () => {
        if (!isLoggedIn) {
            return PATH.LOGIN
        } else return PATH.PROFILE
    }

    return (
        <div>
            <nav>
                <ul className={s.menu}>
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PROFILE} className={''}>ProfilePage</NavLink>*/}
                    {/*</li>*/}
                    <li className={``}>
                        <NavLink to={onPackListHandler()} className={''}>Pack list</NavLink>
                        {/*<NavLink to={PATH.PACKS} className={''}>Pack list</NavLink>*/}
                    </li>
                    <li className={``}>
                        <NavLink to={onProfileHandler()} className={''}>Profile</NavLink>
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
