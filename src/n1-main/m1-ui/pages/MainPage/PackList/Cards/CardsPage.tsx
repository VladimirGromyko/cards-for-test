import React from 'react'
import {HeaderPacks} from '../HeaderPacks'
import packsStyle from './cardsTable.module.css'
import SuperInputText from "../../../../common/c2-SuperInput/SuperInputText";
import CardsTable from './CardsTable';
import l from "../../../../common/c7-Loading/loader07.module.css";
import s from "../../../../header/header.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../routes/Paths";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../../m2-bll/store";

const CardsPage = () => {
    const isLoading = useSelector((state: AppStoreType) => state.loading.isLoading);
    return (
        <div className={packsStyle.content}>
            <div style={{width: '100%'}}>
                {isLoading === "loading" && <div className={l.loader07}></div>}
            </div>
            <nav>
                <ul className={s.menu}>
                    <li className={``}>
                        <NavLink to={PATH.PACKS} className={''}>Packs list</NavLink>
                    </li>
                    <li className={``}>
                        <NavLink to={PATH.PROFILE} className={''}>Profile</NavLink>
                    </li>
                </ul>
            </nav>
                <div className={packsStyle.wrapper}>
                    <SuperInputText placeholder='Enter cards name for searching'/>
                    <HeaderPacks/>
                    <CardsTable/>
                </div>

        </div>
    );
};

export default CardsPage;