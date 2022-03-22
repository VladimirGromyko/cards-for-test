import React, { useEffect, useState } from 'react';
import SuperDoubleRange from "../../../common/c9-SuperDoubleRange/SuperDoubleRange";
import s from '../../../common/c9-SuperDoubleRange/superDoubleStyles.module.css'
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import useDebounce from '../../../../../n2-features/f1-hooks/useDebounce';
import { packsAPI } from '../../../../m3-dal/packs-api';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from '../../../../m2-bll/store';
import {getPacksByMinMaxTC, setPacksDataAC, setPacksDataTC} from '../../../../m2-bll/packsReducer'

const Sidebar = () => {
    const user = useSelector<AppStoreType>(state => state.login.user)

    const dispatch = useDispatch()

    const [value, setValue] = useState([0, 100])
    const [isDebouncing, setIsDebouncing] = useState(false);

    const debouncedValue = useDebounce(value, 1500);

    useEffect(() => {
        if (debouncedValue[0] !== 0 || debouncedValue[1] !== 100) {
            setIsDebouncing(true);
            dispatch(getPacksByMinMaxTC(debouncedValue[0],debouncedValue[1] )
            )
        }
    },
        [debouncedValue]
    );
    return (
        <div>
            <p>Cards in pack</p>
            <div className={s.mainWrapper}>
                <span>{value[0]}</span>
                <SuperDoubleRange setValue={setValue} min={value[0]} max={value[1]} />
                <span>{value[1]}</span>
            </div>
        </div>
    );
};

export default Sidebar;

