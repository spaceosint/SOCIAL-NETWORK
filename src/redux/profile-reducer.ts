import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/type";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redax-store";
import {Dispatch} from "react";
import {usersAPI} from "../API/users-api";
import {profileAPI} from "../API/profile-api";



export const actions={
    addPostActionCreator: (newPostText:string) => ({type: 'sn/profile/ADD-POST', newPostText} as const),
    setUserProfile: (profile:ProfileType) => ({type: 'sn/profile/SET_USER_PROFILE', profile}as const),
    setStatus: (status:string) => ({type: 'sn/profile/SET_STATUS', status}as const),
    deletePost: (postId:number) => ({type: 'sn/profile/DELETE_POST', postId}as const),
    savePhotoSuccess: (photos:PhotosType) => ({type: 'sn/profile/SAVE_PHOTO_SUCCESS', photos}as const)

}


type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

type GetStateType = ()=>AppStateType

export const getUsersThunk = (userId:number):ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
}
export const getStatusThunk = (userId:number):ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data))

}
export const updateStatusThunk = (status:string):ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0)
            dispatch(actions.setStatus(status))
}
export const savePhotoThunk = (file:File):ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0)
            dispatch(actions.savePhotoSuccess(data.data.photos))
}
export const saveFormContactsThunk = (formData:any):ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.userId
        const data = await profileAPI.updateProfile(formData)
        if (data.resultCode === 0 && userId != null) {
            dispatch(getUsersThunk(userId))
        } else {
            // @ts-ignore
            dispatch(stopSubmit("contactsForm", {_error: response.data.messages[0]}))
            return Promise.reject(data.messages[0])
        }

}


// const stateType ={
//     posts: [] as Array<postType> | null,
//     profile: [] as Array<profileType> | null,
//     status: null as string | null,
// }


const initialState = {

    posts: [
        {
            id: 1,
            src: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Icecat1-300x300.svg',
            massage: 'Hi, how are you?'
        },
        {
            id: 2,
            src: 'https://institut-economie-circulaire.fr/wp-content/uploads/2021/10/tete-panda-carree-300x300-1.png',
            massage: 'My first post'
        },
        {
            id: 3,
            src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ooops_gaming-profile_image-f463465224619b84-300x300.png',
            massage: 'Hello world'
        },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",

}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes):InitialStateType => {


    switch (action.type) {
        case 'sn/profile/ADD-POST':
            let id = 1
            if (Object.keys(state.posts).length != 0) {
                let lastPosts = state.posts[Object.keys(state.posts).length - 1]
                id = lastPosts.id + 1
            }
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                    id: id,
                    src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ooops_gaming-profile_image-f463465224619b84-300x300.png',
                    massage: action.newPostText,
                    }]
            }
        // case UPDATE_NEW_POST_TEXT:
        //     return  {
        //         ...state,
        //         newPostText: action.newText
        //     }
        case 'sn/profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'sn/profile/SET_STATUS':

            return {

                ...state,
                status: action.status
            }
        case 'sn/profile/SAVE_PHOTO_SUCCESS':

            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            }
        case 'sn/profile/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        default:
            return state
    }
    return state
}

export default profileReducer