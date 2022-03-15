import React from 'react'
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperInputText from "../common/c2-SuperInput/SuperInputText";
import s from './testPage.module.css'
import ThemeChanger from "../common/c5-ThemeChanger/ThemeChanger";
import CardsChanger from "../common/c6-CardsChanger/CardsChanger";
import { cardsAPI } from '../../m3-dal/cards-api';


const TestPage = () => {
//     const onClickHandler = (e:any) =>{
// ThemeChanger()
//
//     }
    const onClickGetCards = ()=> {
        cardsAPI.getAllCards('605c9467af4bcf0004606874', '1000').then(res=> {
            debugger
        })
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
                <button onClick={onClickGetCards}>Get cards</button>
            </div>
        </div>

    )
}

export default TestPage
