import React, {ChangeEvent, useState} from 'react'
import packsStyle from './CardsTable.module.css'
import CardsTable from './CardsTable';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {cardsAPI, SortNameType, SortNumberType} from "../../../../../m3-dal/cards-api";
import {getAllCardAC, getCardsBySearchTC, getCardsTC} from "../../../../../m2-bll/cardsReducer1";
import SuperInputText from "../../../../common/c2-SuperInput/SuperInputText";
import SuperButton from "../../../../common/c1-SuperButton/SuperButton";
import {HeaderCards} from "../HeaderCards";
import l from "../../../../common/c7-Loading/loader07.module.css";
import {AppStoreType} from "../../../../../m2-bll/store";

const CardsPage = () => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const dispatch = useDispatch()
    const params = useParams()
    const packId = params.id
    const [searchValue, setSearchValue] = useState('')

    const getCards = (packId: string, sortNumber?: SortNumberType, sortName?: SortNameType, search?: string) => {
        dispatch(getCardsTC({packId, sortNumber, sortName}))
    }

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const onSearchClick = () => {
        if (packId) {
            dispatch(getCardsBySearchTC({packId, search: searchValue}))
        }

    }


    return (
        <div className={packsStyle.content}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <div className={packsStyle.wrapper}>
                <h3>Pack name</h3>
                <div className={packsStyle.search}>
                    <SuperInputText onChange={onSearchInputChange} placeholder='Enter cards name for searching'/>
                    <SuperButton onClick={onSearchClick}>Search</SuperButton></div>
                <HeaderCards getCards={getCards} packId={packId}/>
                <CardsTable getCards={getCards} packId={packId}/>

            </div>

        </div>
    );
};

export default CardsPage;