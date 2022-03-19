import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './superDoubleStyles.module.css'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type SuperDoubleRangePropsType = DefaultInputPropsType & {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    min: number
    max: number
    setValue: (num: number) => void
    setValue2: (num: number) => void
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value,
        // min, max, step, disable, ...
        min, max, onChange,
        setValue, setValue2
    }
) => {
    // сделать самому, можно подключать библиотеки

    const fillColor = `linear-gradient(to right, #dadae5 ${min}% , #3264fe ${min}% , #3264fe ${max}%, #dadae5 ${max}%)`;
    const leftInput = `${s.range} ${s.left}`
    const rightInput = `${s.range} ${s.right}`

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e) // сохраняем старую функциональность

        onChangeRange && onChangeRange([min, +e.currentTarget.value])
        if (+e.currentTarget.value >= min) {
            setValue(+e.currentTarget.value)

        }

    }
    const onChangeCallback2 = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e) // сохраняем старую функциональность

        onChangeRange && onChangeRange([+e.currentTarget.value, max])
        if (+e.currentTarget.value <= max) {
            setValue2(+e.currentTarget.value)

        }

    }



    return (
        <>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.sliderTrack} style={{background:fillColor}}></div>
                    <input type="range" min="0" max="100" value={min < max ? min : max} id="slider-1" className={leftInput} onChange={onChangeCallback2} />
                    <input type="range" min="0" max="100" value={max > min ? max : min} id="slider-2" className={rightInput} onChange={onChangeCallback} />
                </div>
            </div>

        </>
    )
}

export default SuperDoubleRange
