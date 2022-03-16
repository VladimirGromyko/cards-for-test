import React, { ChangeEvent, useEffect, useState } from 'react'
import packsStyle from './CardsTable.module.css'
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import CardsTable from './CardsTable';
import { HeaderCards } from "./HeaderCards";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreType } from "../../../m2-bll/store";
import { CardType, getAllCardAC } from "../../../m2-bll/cardsReducer1";
import { useParams } from "react-router-dom";
import { cardsAPI, SortNameType, SortNumberType } from "../../../m3-dal/cards-api";

const CardsPage = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const packId = params.id

    const getCards = (packId: string, sortNumber?: SortNumberType, sortName?: SortNameType) => {
        cardsAPI.getAllCards(packId, '1000', sortNumber, sortName).then(res => {
            dispatch(getAllCardAC(res.data.cards))
        })
    }
    return (
        <div className={packsStyle.content}>
            <div className={packsStyle.wrapper}>
                <h3>Pack name</h3>
                <SuperInputText placeholder='Enter cards name for searching' />
                <HeaderCards getCards={getCards} packId={packId} />
                <CardsTable getCards={getCards} packId={packId} />

            </div>

        </div>
    );
};

export default CardsPage;

