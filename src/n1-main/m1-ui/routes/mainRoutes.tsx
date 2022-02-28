import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from "../pages/Error404";
import {PATH} from "./Paths";

const MainRoutes = () => {
    return (
        <div>
            <Routes>

                <Route path={PATH.REGISTRATION} element={<>REG-1</>}/>
                <Route path={PATH.LOGIN} element={<>LOG-2</>}/>
                <Route path={PATH.PROFILE} element={<>MAIN</>}/>
                <Route path={'/404'} element={<h2 style={{textAlign: "center"}}><Error404/></h2>}/>
                <Route path='*' element={<Navigate to={'/404'} />} />

            </Routes>

        </div>
    )
}

export default MainRoutes