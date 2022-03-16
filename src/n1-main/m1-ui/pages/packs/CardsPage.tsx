import React, {ChangeEvent, useEffect, useState} from 'react'
import packsStyle from './cardsTable.module.css'
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import CardsTable from './CardsTable';
import {HeaderCards} from "./HeaderCards";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {CardType, getAllCardAC} from "../../../m2-bll/cardsReducer1";
import {useParams} from "react-router-dom";
import {cardsAPI} from "../../../m3-dal/cards-api";

const CardsPage = () => {

    return (
        <div className={packsStyle.content}>
                <div className={packsStyle.wrapper}>
                    <h3>Pack name</h3>
                    <SuperInputText placeholder='Enter cards name for searching'/>
                    <HeaderCards/>
                    <CardsTable/>

                </div>

        </div>
    );
};

export default CardsPage;