import {instance} from "./instance";
// import {AxiosResponse} from "axios";

// export const authsAPI = {

    // updateUser(name: string) {
    //     return instance.put<{ name: string },AxiosResponse<ResponseType>>('auth/me', {name});
    // }
// }

export const cardsAPI = {

    getAllCards(params:{cardsPackId: string, pageCount?:string, sortNumber?:SortNumberType, sortName?: SortNameType , search?:string}) {
        return instance.get(`/cards/card?cardsPack_id=${params.cardsPackId}&pageCount=${params.pageCount}&sortCards=${params.sortNumber}${params.sortName}&cardQuestion=${params.search}`);
    },
    addCard(params:{cardsPack_id: string, question: string, answer:string}){
        debugger
        return  instance.post(`/cards/card`, {card: {cardsPack_id:params.cardsPack_id, question:params.question, answer:params.answer}})
    },
    deleteCard(params:{cardId: string}){
        return instance.delete(`/cards/card?id=${params.cardId}`)
    },
    updateCard(params:{cardId: string, newQuestion?: string}){
        return instance.put(`/cards/card`, {card: {_id:params.cardId, question:params.newQuestion}})
    },
}

export type SortNumberType = 0 | 1 
export type SortNameType = 'question' | 'answer' | 'updated' | 'grade'