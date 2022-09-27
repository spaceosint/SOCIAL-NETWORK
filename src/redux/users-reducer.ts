import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../types/type";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redax-store";
import { Dispatch } from "react";

import {usersAPI} from "../API/users-api";
import {debug} from "util";




const initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number|null & boolean|null>, //array of users id
}
type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action:ActionsTypes):InitialStateType => {


    switch (action.type) {
        case 'ns/users/FOLLOW':
            debugger
            return {

                ...state,
                users: updateObjectInArray(state.users, action.userid, 'id', {followed: true})
            }

        case 'ns/users/UNFOLLOW':
            debugger
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userid, 'id', {followed: false})
            }

        case 'ns/users/SET_USERS': {
            return {
                ...state,
                users: [...action.users]

            }
        }
        case 'ns/users/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage

            }
        }
        case 'ns/users/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.count

            }
        }
        case 'ns/users/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'ns/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userid]
                    : state.followingInProgress.filter(id => id != action.userid)
            }
        }

        default:
            return state
    }

}


type GetStateType = ()=>AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>


export const actions ={

    followSuccess: (userid:number) => ({type: 'ns/users/FOLLOW', userid} as const),
    unfollowSuccess: (userid:number) => ({type: 'ns/users/UNFOLLOW', userid}as const),

    setUsers: (users:Array<UsersType>) => ({type: 'ns/users/SET_USERS', users}as const),

    setCurrentPage: (currentPage:number) => ({type: 'ns/users/SET_CURRENT_PAGE', currentPage}as const),
    setTotalUsersCount: (totalUsersCount:number) => ({type: 'ns/users/SET_TOTAL_USERS_COUNT', count: totalUsersCount}as const),

    toggleIsFetching: (isFetching:boolean) => ({type: 'ns/users/TOGGLE_IS_FETCHING', isFetching}as const),

    toggleFollowingProgress: (isFetching:boolean, userid:number) => ({
        type: 'ns/users/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userid
    }as const)

}



export const getUsersThunkCreator = (currentPage:number, pageSize:number):ThunkType => {

    return async (dispatch, getState:GetStateType) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))

        usersAPI.getUsers(currentPage, pageSize).then((data: { items: UsersType[]; totalCount: number; }) => {
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
            dispatch(actions.toggleIsFetching(false))
        })
    }
}
const followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, actionCreator:(userId:number)=> ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}


export const followUser = (userId:number):ThunkType => {
    debugger
    return async (dispatch) => {

        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollowUser = (userId:number):ThunkType => {
    return async (dispatch) => {

        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)


    }
}

export default usersReducer