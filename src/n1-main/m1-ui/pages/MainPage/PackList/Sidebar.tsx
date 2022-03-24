import React, {useEffect, useState} from 'react';
import SuperDoubleRange from "../../../common/c9-SuperDoubleRange/SuperDoubleRange";
import s from '../../../common/c9-SuperDoubleRange/superDoubleStyles.module.css'
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import useDebounce from '../../../../../n2-features/f1-hooks/useDebounce';
import {packsAPI} from '../../../../m3-dal/packs-api';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../../m2-bll/store';
import {setPacksDataAC, setPacksDataTC} from '../../../../m2-bll/packsReducer'

const Sidebar = () => {
    const user = useSelector<AppStoreType>(state => state.login.user)

    const dispatch = useDispatch()

    // const [value1, setValue1] = useState(0)
    // const [value2, setValue2] = useState(100)
    const [value, setValue] = useState([0, 100])
    const [isDebouncing, setIsDebouncing] = useState(false);

    const debouncedValue = useDebounce(value, 1500);

    useEffect(() => {
            if (debouncedValue) {
                setIsDebouncing(true);
                dispatch(setPacksDataTC({
                    params: {
                        min: debouncedValue[0],
                        max: debouncedValue[1],
                        pageCount: 20,
                    }
                }))
            } else {
                alert('Something has gone wrong with double range')
            }
        },
        [debouncedValue]
    );
    return (
        <div>
            <div className={s.title}>Number of cards</div>
            <div className={s.numbersWrapper}>
                <div className={s.title}>{value[0]}</div>
                <div     className={s.title}>{value[1]}</div>
            </div>
            <div className={s.mainWrapper}>
                <SuperDoubleRange setValue={setValue} min={value[0]} max={value[1]}/>
            </div>

        </div>
    );
};

export default Sidebar;

