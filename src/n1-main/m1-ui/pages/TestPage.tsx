import React from 'react'
import SuperButton from "../common/c1-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperInputText from "../common/c2-SuperInput/SuperInputText";
import s from './testPage.module.css'

const TestPage =() => {
    return (
        <div className={s.testing}>
            <h2>Test Page</h2>
            <SuperButton onClick={()=>3}>Super Button</SuperButton>
            <div><SuperCheckbox><h4>Something check</h4></SuperCheckbox></div>
            <div></div>
            <SuperInputText/>
        </div>
    )
}

export default TestPage
