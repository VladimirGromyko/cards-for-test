import React, {useEffect, useState} from 'react';
import SuperDoubleRange from "../../../common/c9-SuperDoubleRange/SuperDoubleRange";
import s from '../../../common/c9-SuperDoubleRange/superDoubleStyles.module.css'
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import useDebounce from '../../../../../n2-features/f1-hooks/useDebounce';
import { packsAPI} from '../../../../m3-dal/packs-api';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from '../../../../m2-bll/store';
import {setPacksDataAC} from '../../../../m2-bll/packsReducer'

const Sidebar = () => {
    const user = useSelector<AppStoreType>(state => state.login.user)

    const dispatch = useDispatch()
    
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(100)
    const [isDebouncing, setIsDebouncing] = useState(false);

    const debouncedValue = useDebounce(value1, 1500);
    const debouncedValue2 = useDebounce(value2, 1500);

    const onCheckClick = () => {
        packsAPI.setPacks({params: {
            min: debouncedValue,
            max: debouncedValue2,
            pageCount: 20,
        }}).then((res) =>
        dispatch(setPacksDataAC(res.data))
        )
    }

    useEffect(() => {
        if (debouncedValue || debouncedValue2) {
          setIsDebouncing(true);
          console.log(debouncedValue)
          console.log(debouncedValue2)
          
        } 
        else {
          console.log('Else')
        }
      },
      [debouncedValue, debouncedValue2]
    );
    return (
        <div>
            <p>Cards in pack</p>
            <div className={s.mainWrapper}>
                <span>{value1}</span>
                <SuperDoubleRange setValue={setValue2} setValue2={setValue1} min={value1} max={value2}/>
                <span>{value2}</span>
            </div>
            <SuperButton onClick={onCheckClick}>Check</SuperButton>
        </div>
    );
};

export default Sidebar;

