import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from "../pages/Error404";
import {PATH} from "./Paths";
import LoginPage from "../pages/login/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import TestPage from "../pages/TestPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import PasswordRecoveryPage from "../pages/PasswordRecoveryPage";
import Registration from '../pages/Registration';

import PackList from "../pages/MainPage/PackList/PackList";
import {ProfilePage} from "../pages/MainPage/profile/ProfilePage";
import EditPack from "../pages/MainPage/PackList/EditPack";
import {PacksPage} from "../pages/packs/PacksPage";
import CardsPage from '../pages/packs/CardsPage';

import {TestPackPage} from "../pages/cardsTest/Test-pack-page";
import {TestCardPage} from "../pages/cardsTest/Test-cards-page";

const MainRoutes = () => {
    return (
        <div>
            <Routes>

                <Route path={PATH.REGISTRATION}
                       element={<h2 style={{textAlign: "center"}}><Registration/></h2>}/>
                <Route path={PATH.LOGIN} element={<h2 style={{textAlign: "center"}}><LoginPage/></h2>}/>
                <Route path={PATH.PROFILE} element={<h2 style={{textAlign: "center"}}><ProfilePage/></h2>}/>
                <Route path={PATH.MAIN} element={<h2 style={{textAlign: "center"}}><MainPage/></h2>}/>
                <Route path={PATH.PACK_LIST} element={<h2 style={{textAlign: "center"}}><PackList/></h2>}/>
                <Route path={PATH.EDIT_PACK} element={<h2 style={{textAlign: "center"}}><EditPack/></h2>}/>
                {/*<Route path={PATH.TEST} element={<h2 style={{textAlign: "center"}}><TestPage/></h2>}/>*/}
                <Route path={PATH.CHANGE_PASSWORD}
                       element={<h2 style={{textAlign: "center"}}><ChangePasswordPage/></h2>}/>
                <Route path={PATH.PASSWORD_RECOVERY}
                       element={<h2 style={{textAlign: "center"}}><PasswordRecoveryPage/></h2>}/>
                <Route path={PATH.PACKS} element={<h2 style={{textAlign: "center"}}><PacksPage /></h2>}/>
                <Route path={PATH.CARDS} element={<h2 style={{textAlign: "center"}}><CardsPage /></h2>}/>
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