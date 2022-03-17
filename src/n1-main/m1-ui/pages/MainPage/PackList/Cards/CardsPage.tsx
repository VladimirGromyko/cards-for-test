import React, { ChangeEvent, useState } from 'react'
import packsStyle from './CardsTable.module.css'
import CardsTable from './CardsTable';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {cardsAPI, SortNameType, SortNumberType} from "../../../../../m3-dal/cards-api";
import {getAllCardAC} from "../../../../../m2-bll/cardsReducer1";
import SuperInputText from "../../../../common/c2-SuperInput/SuperInputText";
import SuperButton from "../../../../common/c1-SuperButton/SuperButton";
import {HeaderCards} from "../HeaderCards";

const CardsPage = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const packId = params.id
    const [searchValue, setSearchValue] = useState('')

    const getCards = (packId: string, sortNumber?: SortNumberType, sortName?: SortNameType,search?:string) => {
        cardsAPI.getAllCards({cardsPackId:packId, pageCount:'1000', sortNumber, sortName}).then(res => {
            dispatch(getAllCardAC(res.data.cards))
        })
    }

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const onSearchClick = () => {
        if(packId){
            cardsAPI.getCardBySearch({cardsPackId:packId,pageCount:'1000', search:searchValue}).then(res => {
                debugger
            })
        }

    }


    return (
        <div className={packsStyle.content}>
            <div className={packsStyle.wrapper}>
                <h3>Pack name</h3>
                <SuperInputText onChange={onSearchInputChange} placeholder='Enter cards name for searching' />
                <SuperButton onClick={onSearchClick}>Search</SuperButton>
                <HeaderCards getCards={getCards} packId={packId} />
                <CardsTable getCards={getCards} packId={packId} />

            </div>

        </div>
    );
};

export default CardsPage;