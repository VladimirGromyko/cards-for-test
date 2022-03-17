import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {setPacksDataTC} from "../../../m2-bll/packsReducer";
import s from "./Pagination.module.css"

export default function PaginationRounded() {
    const dispatch = useDispatch();
    const cardPacksTotalCount = useSelector((state: AppStoreType) => state.packs.packsData.cardPacksTotalCount);
    const pageSize = 20

    const portionCount = Math.ceil(cardPacksTotalCount / pageSize)
    const getCurentPage = (e:any, page:number) => {
        dispatch(setPacksDataTC({params: {page}}))
    }

    return (
        <div className={s.pagination}>
        <Stack spacing={2}>
            <Pagination count={portionCount} onChange={getCurentPage} shape="rounded" />

        </Stack>
        </div>
    );
}
