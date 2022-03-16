import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from "../pages/Error404";
import {PATH} from "./Paths";
import LoginPage from "../pages/p2-login/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import TestPage from "../pages/TestPage";
import ChangePasswordPage from "../pages/p3-pass-recovery/ChangePasswordPage";
import PasswordRecoveryPage from "../pages/p3-pass-recovery/PasswordRecoveryPage";
import AlternativeRegistration from '../pages/p1-registration/AlternativeRegistration';

import PackList from "../pages/MainPage/PackList/PackList";
import {ProfilePage} from "../pages/MainPage/profile/ProfilePage";
import EditPack from "../pages/MainPage/PackList/EditPack";
import {PacksPage} from "../pages/MainPage/PackList/PacksPage";
import CardsPage from '../pages/MainPage/PackList/Cards/CardsPage';


const MainRoutes = () => {
    return (
        <div>
            <Routes>

                <Route path={PATH.REGISTRATION}
                       element={<h2 style={{textAlign: "center"}}><AlternativeRegistration/></h2>}/>
                <Route path={PATH.LOGIN} element={<h2 style={{textAlign: "center"}}><LoginPage/></h2>}/>
                <Route path={PATH.PROFILE} element={<h2 style={{textAlign: "center"}}><ProfilePage/></h2>}/>
                <Route path={PATH.MAIN} element={<h2 style={{textAlign: "center"}}><MainPage/></h2>}/>
                {/*<Route path={PATH.EDIT_PACK} element={<h2 style={{textAlign: "center"}}><EditPack/></h2>}/>*/}
                <Route path={PATH.TEST} element={<h2 style={{textAlign: "center"}}><TestPage/></h2>}/>
                <Route path={PATH.CHANGE_PASSWORD}
                       element={<h2 style={{textAlign: "center"}}><ChangePasswordPage/></h2>}/>
                <Route path={PATH.PASSWORD_RECOVERY}
                       element={<h2 style={{textAlign: "center"}}><PasswordRecoveryPage/></h2>}/>
                <Route path={PATH.PACKS} element={<h2 style={{textAlign: "center"}}><PacksPage/></h2>}/>
                <Route path={PATH.CARDS} element={<h2 style={{textAlign: "center"}}><CardsPage/></h2>}/>
                <Route path={'/404'} element={<h2 style={{textAlign: "center"}}><Error404/></h2>}/>
                <Route path='*' element={<Navigate to={'/404'}/>}/>

            </Routes>

        </div>
    )
}

export default MainRoutes