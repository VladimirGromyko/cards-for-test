import React from "react";
import s from "./ThemeChanger.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {changeThemeAC, stateThemeType} from "../../../m2-bll/themeReducer";
import SuperRadio from "../c4-SuperRadio/SuperRadio";

export const themes: ThemesNameType[] = ['dark', 'red', 'some'];
export type ThemesNameType = 'dark' | 'red' | 'some'

function ThemeChanger() {
    const theme = useSelector<AppStoreType, stateThemeType>(state => state.theme)
    const dispatch = useDispatch()

    const onChangeCallback = (theme: ThemesNameType) => {
        dispatch(changeThemeAC(theme))
    }

    return (

        <div className={s[theme.themesName]}>
            <hr/>
            <span className={s[theme.themesName + '-text']}>
                <h4>Themes of screen</h4>
            </span>
            <div>
                <SuperRadio
                    name={'radio'}
                    options={themes}
                    value={theme.themesName}
                    onChangeOption={onChangeCallback}
                />
            </div>

            <hr/>
        </div>
    );
}

export default ThemeChanger;
