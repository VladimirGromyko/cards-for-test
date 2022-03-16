import {instance} from "./instance";
// import {AxiosResponse} from "axios";

// export const authsAPI = {

    // updateUser(name: string) {
    //     return instance.put<{ name: string },AxiosResponse<ResponseType>>('auth/me', {name});
    // }
// }

export const cardsAPI = {

    getAllCards(cardsPackId: string, pageCount?:string, sortNumber?:SortNumberType, sortName?: SortNameType) {
        return instance.get(`/cards/card?cardsPack_id=${cardsPackId}&pageCount=${pageCount}&sortCards=${sortNumber}${sortName}`);
    },
    addCard(cardsPack_id: string, question: string, answer:string){
        return instance.post(`/cards/card`, {card: {cardsPack_id, question, answer}})
    },
    deleteCard(cardId: string){
        return instance.delete(`/cards/card?id=${cardId}`)
    },
    updateCard(cardId: string, newQuestion?: string){
        return instance.put(`/cards/card`, {card: {_id:cardId, question:newQuestion}})
    },
}

export type SortNumberType = 0 | 1 
export type SortNameType = 'question' | 'answer' | 'updated' | 'grade'