import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './SuperInputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    onKeyPress?: (value: string) => void
    error?: string
    spanClassName?: string
    value?: string
    // onChange: (newValue: string) => void
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (




{
    type, value,
    onChange, onChangeText,
    onKeyPress, onEnter,
    error,
    className, spanClassName,

    ...restProps
}
) => {

    // let [editMode, setEditMode] = useState(false);
//
// const activateEditMode = () => {
//     setEditMode(true);
//     setTitle(props.value);
// }
// const activateViewMode = () => {
//     setEditMode(false);
//     props.onChange(title);
// }
// const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.currentTarget.value)
// }

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.superInput} ${error ? s.errorInput : s.superInput}`
    //const finalInputClassName = `${s.input} ${error ? s.errorInput : s.superInput} ${className}`

    return (
        <>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                value={value}

                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
            <br/>
        </>
    )
}

export default SuperInputText
