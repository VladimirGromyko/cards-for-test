import React from 'react';
import { HashRouter } from 'react-router-dom';

import './App.css';
import {Provider} from "react-redux";

function App() {
    return (
        <div className="App">
            <HashRouter>Hello
                {/*<Provider store={ '',''}>*/}
                <>
                    {/*<Header />*/}
                    {/*<Main/>*/}
                </>
                {/*</Provider>*/}
            </HashRouter>
        </div>

)
    ;
}

export default App;
