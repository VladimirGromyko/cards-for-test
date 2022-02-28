import React from 'react';
import {HashRouter} from 'react-router-dom';

import './App.css';
import {Provider} from "react-redux";
import Main from './Main';

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                {/*<Provider store={ '',''}>*/}
                <>
                    <Main/>
                </>
                {/*</Provider>*/}
            </HashRouter>
        </div>

    )
        ;
}

export default App;
