import React from 'react'
import { NavLink } from 'react-router-dom'
import {PATH} from "../routes/Paths";
import s from '../header/header.module.css'

function Header() {
    return (
        <div>
            <nav>
                {/*<input type={"checkbox"} id={"hmt"} className={"s.hiddenMenuTicker"}/>*/}
                {/*<label className={"s.btnMenu"} htmlFor={"hmt"}>*/}
                {/*    <span className={"s.first"}></span>*/}
                {/*    <span className={"s.second"}></span>*/}
                {/*    <span className={"s.third"}></span>*/}
                {/*</label>*/}

                <ul className={s.menu}>
                    <li className={``}>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <NavLink to={PATH.TEST} className={''}>Test Page</NavLink>
                    </li>
                    <li className={``}>
                        <NavLink to={PATH.PROFILE} className={''}>Main Page</NavLink>
                    </li>
                    <li className={``}>
                        <NavLink to={PATH.LOGIN} className={''}>Login Page</NavLink>
                    </li>
                    <li className={``}>
                        <NavLink to={PATH.CHANGE_PASSWORD} className={''}>Change Password Page</NavLink>
                    </li>
                    <li className={``}>
                        <NavLink to={PATH.PASSWORD_RECOVERY} className={''}>Password Recovery Page</NavLink>
                    </li>
                    <li className={``}>
                        <NavLink to={PATH.REGISTRATION} className={''}>Registration Page</NavLink>
                    </li>

                    {/*<li className={s.item}>*/}
                    {/*    <NavLink to={PATH.JUNIOR} activeClassName={s.activeLink}>JUNIOR</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className={s.item}>*/}
                    {/*    <NavLink to={PATH.JUNIOR_PLUS} activeClassName={s.activeLink}>JUNIOR_PLUS</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </nav>




        </div>
    )
}

export default Header
