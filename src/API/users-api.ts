import {GetItemsType, instance, ResponseType} from "./api";
import {profileAPI} from "./profile-api";
import {AxiosPromise} from "axios";

export const usersAPI = {

    getUsers(pageNumber = 1, pageSize = 100) {
        return instance.get<GetItemsType>(`users?page=${pageNumber}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow(userId: number) {

        return instance.post<ResponseType>(`follow/${userId}`).then(res=>res.data)

    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res=>res.data) as AxiosPromise<ResponseType>
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId)
    }
}