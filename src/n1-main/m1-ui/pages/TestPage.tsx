import React from 'react'
import SuperButton from "../common/c1-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperInputText from "../common/c2-SuperInput/SuperInputText";
import s from './testPage.module.css'
import ThemeChanger from "../common/c5-ThemeChanger/ThemeChanger";
import CardsChanger from "../common/c6-CardsChanger/CardsChanger";


const TestPage = () => {
    const onClickHandler = (e:any) =>{
ThemeChanger()

    }

    return (
        <div>
            <h2>Test</h2>
            <div className={s.testing}>

                <CardsChanger />
                {/*<SuperButton onClick={onClickHandler}>Super Button</SuperButton>*/}

                <div><SuperCheckbox><h4>Something check</h4></SuperCheckbox></div>
                <SuperInputText/>
                <ThemeChanger />
            </div>
        </div>

    )
}

export default TestPage
