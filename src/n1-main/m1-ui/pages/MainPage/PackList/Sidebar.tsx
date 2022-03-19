import React, {useState} from 'react';
import SuperDoubleRange from "../../../common/c9-SuperDoubleRange/SuperDoubleRange";
import s from '../../../common/c9-SuperDoubleRange/superDoubleStyles.module.css'
import SuperButton from "../../../common/c1-SuperButton/SuperButton";

const Sidebar = () => {

    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(100)
    return (
        <div>
            Owner packs
            {/*<input type='range'/>*/}
            <p>Cards in pack</p>
            <div className={s.mainWrapper}>
                <span>{value1}</span>
                <SuperDoubleRange setValue={setValue2} setValue2={setValue1} min={value1} max={value2}/>
                <span>{value2}</span>
            </div>
            <SuperButton>Check</SuperButton>
        </div>
    );
};

export default Sidebar;