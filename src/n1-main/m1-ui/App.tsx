import React from 'react';
import {HashRouter} from 'react-router-dom';

import './App.css';
import {Provider} from "react-redux";
import Main from './Main';
import {store} from "../m2-bll/store";

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </HashRouter>
        </div>

    )
        ;
}

export default App;
