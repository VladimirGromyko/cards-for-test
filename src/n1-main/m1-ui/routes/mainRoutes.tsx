import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from "../pages/Error404";
import {PATH} from "./Paths";
import MainPage from "../pages/MainPage/MainPage";
import TestPage from "../pages/TestPage";
import ChangePasswordPage from "../pages/p3-pass-recovery/ChangePasswordPage";
import PasswordRecoveryPage from "../pages/p3-pass-recovery/PasswordRecoveryPage";
import {EditProfilePage} from "../pages/MainPage/profile/EditProfilePage";
import {PacksPage} from "../pages/MainPage/PackList/PacksPage";
import CardsPage from '../pages/MainPage/PackList/Cards/CardsPage';
import Registration from "../pages/p1-registration/Registration";
import LoginPage from "../pages/p2-login/LoginPage";
import {ProfilePacksPage} from "../pages/MainPage/PackList/ProfilePacksPage";

const MainRoutes = () => {
    return (
        <div>
            <Routes>

                <Route path={PATH.REGISTRATION}
                       element={<h2 style={{textAlign: "center"}}><Registration/></h2>}/>
                <Route path={PATH.LOGIN} element={<h2 style={{textAlign: "center"}}><LoginPage/></h2>}/>
                <Route path={PATH.PROFILE} element={<h2 style={{textAlign: "center"}}><EditProfilePage/></h2>}/>
                <Route path={PATH.EDIT_PROFILE} element={<h2 style={{textAlign: "center"}}><EditProfilePage/></h2>}/>
                <Route path={PATH.MAIN} element={<h2 style={{textAlign: "center"}}><MainPage/></h2>}/>
                <Route path={PATH.TEST} element={<h2 style={{textAlign: "center"}}><ProfilePacksPage/></h2>}/>
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