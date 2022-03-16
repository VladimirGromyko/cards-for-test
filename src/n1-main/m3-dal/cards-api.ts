import {instance} from "./instance";
// import {AxiosResponse} from "axios";

// export const authsAPI = {

    // updateUser(name: string) {
    //     return instance.put<{ name: string },AxiosResponse<ResponseType>>('auth/me', {name});
    // }
// }

export const cardsAPI = {

    getAllCards(cardsPackId: string, pageCount?:string) {
        return instance.get(`/cards/card?cardsPack_id=${cardsPackId}&pageCount=${pageCount}`);
    },
    addCard(cardsPack_id: string, question: string, answer:string){
        return instance.post(`/cards/card`, {card: {cardsPack_id, question, answer}})
    },
    deleteCard(cardId: string){
        return instance.delete(`/cards/card?id=${cardId}`)
    }
}

