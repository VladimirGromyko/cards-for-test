import { instance } from "./instance";



export const packsApi = {
    getPacks: (payload: FetchPacksType) => {
        return instance.get("/cards/pack", {
            params: {
                ...payload,
            },
        });
    }
}

export type FetchPacksType = {
    packName: string;
    min: number;
    max: number;
    sortPacks: string;
    page: number;
    pageCount: number;
    user_id?: string;
};