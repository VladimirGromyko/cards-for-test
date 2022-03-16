import React from 'react'
import {HeaderPacks} from './HeaderPacks'
import packsStyle from './cardsTable.module.css'
import SuperInputText from "../../common/c2-SuperInput/SuperInputText";
import CardsTable from './CardsTable';

const CardsPage = () => {

    return (
        <div className={packsStyle.content}>
                <div className={packsStyle.wrapper}>
                    <SuperInputText placeholder='Enter cards name for searching'/>
                    <HeaderPacks/>
                    <CardsTable/>
                </div>

        </div>
    );
};

export default CardsPage;