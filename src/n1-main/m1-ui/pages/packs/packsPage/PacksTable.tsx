// import React from "react";
// import {useSelector} from "react-redux";
// import {AppStoreType} from "../../../../m2-bll/store";
// // import {cardPacksType} from "./packsReducer";
// import { PackItem } from "./PackItem";
// import {CardPacksType} from "../../../../m3-dal/packs-api";
//
//
//
//
// export const PacksTable = () => {
//
//     const pack = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.packsData.cardPacks)
//     console.log('pack',pack)
//     return (
//         <div>
//             {pack.map((p) => {
//                 return <PackItem key={p._id} pack={p} />
//             })}
//         </div>
//     )
// }