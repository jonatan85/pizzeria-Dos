import AxiosApi from "./axiosApi";
import { Pizza } from "../types/pizza.ts";

export type OrderPayload = {
    user: string;
    items: {
        pizza: Omit<Pizza, "_id"> | string;
        quantity: number;
    } [];
    total: number;
};

export const placeOrder = async (order: OrderPayload): Promise<void> => {
    const response = await AxiosApi.post("/orders", order);
    return response.data;
}