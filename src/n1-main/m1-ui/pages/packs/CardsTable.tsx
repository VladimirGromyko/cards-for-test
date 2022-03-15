import React from 'react'
import cardsStyle from '../packs/cardsTable.module.css'



const CardsTable = () => {

    // const cards = useSelector<AppStoreType, stateCardsType[]>(state => state.cards)


    return (
        <div className={cardsStyle.container}>
            {
                // cards.map((c) => {
                //     <div key={c.cardsName}>{c.cardsName}</div>
                // })
            }
        </div>
    );
};

export default CardsTable;