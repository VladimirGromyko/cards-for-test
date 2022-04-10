import React, {useEffect, useState} from 'react';
import SuperDoubleRange from "../../../common/c9-SuperDoubleRange/SuperDoubleRange";
import s from '../../../common/c9-SuperDoubleRange/superDoubleStyles.module.css'
import useDebounce from '../../../../../n2-features/f1-hooks/useDebounce';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../../m2-bll/store';
import {getPacksByMinMaxTC} from '../../../../m2-bll/packsReducer'

const Sidebar = () => {
    const user = useSelector<AppStoreType>(state => state.login.user)
    const maxRX = useSelector<AppStoreType>(state => state.packs.max)
    const minRX = useSelector<AppStoreType>(state => state.packs.min)

    const dispatch = useDispatch()

    const [value, setValue] = useState([0, 100])
    const [isDebouncing, setIsDebouncing] = useState(false);

    const debouncedValue = useDebounce(value, 1500);

    useEffect(() => {
        if (debouncedValue[0] !== minRX || debouncedValue[1] !== maxRX) {
            setIsDebouncing(true);
            dispatch(getPacksByMinMaxTC(debouncedValue[0],debouncedValue[1] )
            )
        }
    },
        [debouncedValue]
    );
    return (
        <div>
            <div className={s.title}>Number of cards</div>
            <div className={s.numbersWrapper}>
                <div className={s.title}>{value[0]}</div>
                <div className={s.title}>{value[1]}</div>
            </div>
            <div className={s.mainWrapper}>
                <SuperDoubleRange setValue={setValue} min={value[0]} max={value[1]}/>
            </div>
        </div>
    );
};

export default Sidebar;

