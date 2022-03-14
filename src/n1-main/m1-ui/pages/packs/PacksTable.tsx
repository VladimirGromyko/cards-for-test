import React from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {cardPacksType} from "./packsReducer";
import { PackItem } from "./PackItem";




export const PacksTable = () => {

    const pack = useSelector<AppStoreType, cardPacksType[]>(state => state.packs.cardPacks)
    console.log(pack)
    return (
        <div>
            {pack.map((p) => {
                return <PackItem key={p._id} pack={p} />
            })}
        </div>
    )
}