import axios from "axios";
import {UsersType} from "../types/type";

export const instance = axios.create(
    {
        withCredentials: true,
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        headers: {
            "API-KEY": "fea42849-149a-42c5-b453-b78b83226a4b"
        }
    }
)
export enum ResultCodesEnum{
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}

// export type GetItemsType<T>={
//
// }
export type GetItemsType={
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}