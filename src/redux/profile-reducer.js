import {profileAPI, usersAPI} from "../API/api";
import {toggleFollowingProgress, unfollowSuccess} from "./users-reducer";

const AAD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';


export const addPostActionCreator = (newPostText) => ({ type: AAD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const getUsersThunk =  (userId)=> async (dispatch) =>{
        let response = await usersAPI.getProfile(userId)
            dispatch(setUserProfile(response.data) )


}
export const getStatusThunk = (userId)=> async (dispatch) =>{
    let response = await profileAPI.getStatus(userId)
            dispatch(setStatus(response.data) )

}
export const updateStatusThunk = (status)=> async (dispatch) =>{

    let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode===0)
                dispatch(setStatus(status) )
}



const  initialState = {

    posts: [
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Icecat1-300x300.svg',
            massage: 'Hi, how are you?'
        },
        {
            src: 'https://institut-economie-circulaire.fr/wp-content/uploads/2021/10/tete-panda-carree-300x300-1.png',
            massage: 'My first post'
        },
        {
            src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ooops_gaming-profile_image-f463465224619b84-300x300.png',
            massage: 'Hello world'
        },
    ],
    profile: null,
    status: "",

}

const profileReducer = (state = initialState, action) =>{


    switch (action.type) {
        case AAD_POST:
           return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ooops_gaming-profile_image-f463465224619b84-300x300.png',
                    massage: action.newPostText,}]
            }
        // case UPDATE_NEW_POST_TEXT:
        //     return  {
        //         ...state,
        //         newPostText: action.newText
        //     }
        case SET_USER_PROFILE:
            return  {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:

            return  {

                ...state,
                status: action.status
            }
        case deletePost:

            return  {

                ...state,
                posts: state.posts.filter(p => p.id != action.id)
            }
        default:
            return state
    }
    return state
}

export default profileReducer