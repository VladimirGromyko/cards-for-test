import React, {ChangeEvent, useEffect, useState} from 'react'
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
import useDebounce from '../../../../../../n2-features/f1-hooks/useDebounce';
import commonPacksStyle from "../PacksPage.module.css";

const CardsPage = () => {

    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    const dispatch = useDispatch()
    const params = useParams()
    const packId = params.id

    const [searchValue, setSearchValue] = useState('')
    const [isSearching, setIsSearching] = useState(false);

    const debouncedValue = useDebounce(searchValue, 1500);

    useEffect(() => {
            // Убедиться что у нас есть значение (пользователь ввел что-то)
            if (debouncedValue) {
                // Выставить состояние isSearching
                setIsSearching(true);
                if (packId) {
                    dispatch(getCardsBySearchTC({packId, search: searchValue}))
                }
            } else {
                if (packId) {
                    dispatch(getCardsBySearchTC({packId, search: searchValue}))
                }
            }
        },
        // Это массив зависимостей useEffect
        // Хук useEffect сработает только если отложенное значение изменится ...
        // ... и спасибо нашему хуку, что оно изменится только тогда ...
        // когда значение searchTerm не менялось на протяжении 500ms.
        [debouncedValue]
    );

    const getCards = (packId: string, sortNumber?: SortNumberType, sortName?: SortNameType, search?: string) => {
        dispatch(getCardsTC({packId, sortNumber, sortName}))
    }

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    // const onSearchClick = () => {
    //     if (packId) {
    //         dispatch(getCardsBySearchTC({ packId, search: searchValue }))
    //     }

    // }


    return (<div className={packsStyle.wrapper}>
            <div className={commonPacksStyle.TableWrapper}>
                <div style={{width: '100%'}}>
                    {isLoading === "loading" && <div className={l.loader07}></div>}
                </div>
                <div style={{width: '1008px'}}>
                    <h3>Pack name</h3>
                    <div className={packsStyle.search}>
                        <SuperInputText onChange={onSearchInputChange}
                                        placeholder='Enter cards name for searching'/>
                    </div>
                    <HeaderCards getCards={getCards} packId={packId}/>
                    <CardsTable getCards={getCards} packId={packId}/>

                </div>
            </div>
        </div>
    );
};

export default CardsPage;