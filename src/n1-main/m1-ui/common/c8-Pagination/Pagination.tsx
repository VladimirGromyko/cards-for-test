import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import s from "./Pagination.module.css"
import ReactPaginate from 'react-paginate';
import {AppStoreType} from "../../../m2-bll/store";
import {setPacksDataTC} from "../../../m2-bll/packsReducer";


export const Pagination = () => {
    const dispatch = useDispatch();
    const pageCount = useSelector((state: AppStoreType) => state.packs.packsData.pageCount);
    const cardPacksTotalCount = useSelector((state: AppStoreType) => state.packs.packsData.cardPacksTotalCount);
    const items = useSelector((state: AppStoreType) => state.packs.packsData.cardPacks);
    const pageCountAmount = Math.ceil(cardPacksTotalCount / pageCount)

    //console.log('items',items)


    const handlePageClick = ({selected}: {selected: number}) => {
        dispatch(setPacksDataTC({params: {page: selected + 1}}))
    };

    return (
        <>
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                breakClassName={s.breakMe}
                pageCount={pageCountAmount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={s.pagination}
                //subContainerClassName={s.pages}
                activeClassName={s.active}

            />

        </>
    )
}