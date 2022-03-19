import React, {useEffect, useState} from "react";
import styles from "./Paginator.module.css";
import cn from "classnames"

export type PaginatorPropsType = {
    cardPacksTotalCount: number,
    pageSize: number,
    currentPage?: number,
    onPageChanged: (pageNumber: number) => void | undefined
    portionSize?: number
}

let paginatorSpan = (currentPage: number, selectedPage: number, onPageChanged: (page: number) => void) => {
    return <span className={cn({[styles.selectedPage]: currentPage === selectedPage}, styles.pageNumber)}
                 key={selectedPage}
                 onClick={() => {
                     onPageChanged(selectedPage)
                 }}> {selectedPage}</span>
}

let Paginator = ({
                     cardPacksTotalCount,
                     pageSize,
                     currentPage = 1,
                     onPageChanged,
                     portionSize = 15
                 }: PaginatorPropsType) => {
    console.log("cardPacksTotalCount: ", cardPacksTotalCount)
    let pagesCount = Math.ceil(cardPacksTotalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / portionSize))
    }, [currentPage, portionSize])

    return <div className={styles.paginator}>
        {paginatorSpan(currentPage, 1, onPageChanged)}
        {'...'}
        {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>{'<'}</button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => paginatorSpan(currentPage, p, onPageChanged))
        }
        {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>{'>'}</button>}
        {'...'}
        {paginatorSpan(currentPage, pagesCount, onPageChanged)}
    </div>

}
export default Paginator