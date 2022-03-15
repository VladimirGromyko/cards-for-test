import {cardsAPI} from "../../../m3-dal/cards-api";
import s from "../testPage.module.css";
import CardsChanger from "../../common/c6-CardsChanger/CardsChanger";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import ThemeChanger from "../../common/c5-ThemeChanger/ThemeChanger";
import React from "react";
import {NavLink, Route, Routes} from 'react-router-dom';
import {TestCardPage} from "./Test-cards-page";

export const TestPackPage = () => {

    return (
        <div>
            <h2>TestPackPage</h2>
            <NavLink to={`623056734348a50004eb4dc3`}>Card</NavLink>
        </div>

    )
}

