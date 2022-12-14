import * as axios from "axios";

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        headers: {
            "API-KEY": "fea42849-149a-42c5-b453-b78b83226a4b"
        }
    }
)
export const usersAPI = {

    getUsers(pageNumber = 1, pageSize = 100) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)

    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)

    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})

    },
    updateProfile(profile) {
        return instance.put(`profile`, profile)

    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })

    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe=false, captcha=null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    },

}
export const securityAPI = {
    getCaptchaURrl() {
        return instance.get(`security/get-captcha-url`)
    },


}
