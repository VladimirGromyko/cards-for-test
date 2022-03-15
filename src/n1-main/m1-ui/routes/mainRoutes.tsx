import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from "../pages/Error404";
import {PATH} from "./Paths";
import Registration from "../pages/Registration";
import LoginPage from "../pages/login/LoginPage";
import MainPage from "../pages/MainPage";
import TestPage from "../pages/TestPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import PasswordRecoveryPage from "../pages/PasswordRecoveryPage";
import AlternativeRegistration from '../pages/AlternativeRegistration';
import {ProfilePage} from "../pages/profile/ProfilePage";
import {TestPackPage} from "../pages/cardsTest/Test-pack-page";
import {TestCardPage} from "../pages/cardsTest/Test-cards-page";

const MainRoutes = () => {
    return (
        <div>
            <Routes>

                <Route path={PATH.REGISTRATION} element={<h2 style={{textAlign: "center"}}><AlternativeRegistration /></h2>}/>
                <Route path={PATH.LOGIN} element={<h2 style={{textAlign: "center"}}><LoginPage /></h2>}/>
                <Route path={PATH.PROFILE} element={<h2 style={{textAlign: "center"}}><ProfilePage/></h2>}/>
                <Route path={PATH.TEST} element={<h2 style={{textAlign: "center"}}><TestPackPage /></h2>}/>
                <Route path={PATH.CHANGE_PASSWORD} element={<h2 style={{textAlign: "center"}}><ChangePasswordPage /></h2>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<h2 style={{textAlign: "center"}}><PasswordRecoveryPage /></h2>}/>
                <Route path={'/404'} element={<h2 style={{textAlign: "center"}}><Error404/></h2>}/>
                <Route path="/test/:id" element={<TestCardPage />} />
                <Route path='*' element={<Navigate to={'/404'} />} />

            </Routes>

        </div>
    )
}

export default MainRoutes