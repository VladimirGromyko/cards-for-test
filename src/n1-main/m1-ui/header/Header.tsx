import React, {useEffect} from 'react'
// @ts-ignore
import {NavLink, useNavigate} from 'react-router-dom'
import {PATH} from "../routes/Paths";
import s from '../header/header.module.css'
import {logoutUserTC} from "../../m2-bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/store";



function Header() {
    const isLoggedIn = useSelector((state: AppStoreType) => state.login.isLoggedIn);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentURL = window.location.href.split('#')

    const logOutHandler = () => {
        if (isLoggedIn) {
            dispatch(logoutUserTC())
        }
    }
    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate(PATH.LOGIN)
    //     }
    // }, [isLoggedIn, navigate])

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
                    {!(currentURL[1] === '/main/packs') ? (<li className={``}>
                        <NavLink to={onPackListHandler()} className={''}>Pack list</NavLink>
                        {/*<NavLink to={PATH.PACKS} className={''}>Pack list</NavLink>*/}
                    </li>) : <div></div>}

                    <li className={``}>
                        <NavLink to={onProfileHandler()} className={''}>Profile</NavLink>
                    </li>

                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.MAIN} className={''}>Main</NavLink>*/}
                    {/*</li>*/}
                    {!isLoggedIn ? (<li className={``}>
                        <NavLink to={PATH.LOGIN} className={''}>Login</NavLink>
                    </li>) : <div></div>}

                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.CHANGE_PASSWORD} className={''}>Change Password</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PASSWORD_RECOVERY} className={''}>Password Recovery</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.REGISTRATION} className={''}>Registration</NavLink>*/}
                    {/*</li>*/}
                    {isLoggedIn ? (<li className={``}>
                        <NavLink to={PATH.LOGIN} className={''} onClick={logOutHandler}>LogOut</NavLink>
                    </li>) : <div></div>}
                    {/*<li className={``}>*/}
                    {/*    <NavLink to={PATH.PACKS} className={''}>Packs</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </nav>
        </div>
    )
}

export default Header
