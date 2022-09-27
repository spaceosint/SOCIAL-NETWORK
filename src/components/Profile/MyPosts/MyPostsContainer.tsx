import React from 'react';

import MyPost from "./MyPost";

import {connect} from "react-redux";

import {actions, InitialStateType} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redax-store";
import {ProfileType} from "../../../types/type";

export type mapStateToPropsProps={
    ProfileFormValue: any
    profilePages: ProfileType
}
let mapStateToProps = (state:AppStateType):mapStateToPropsProps =>{
    return{
        ProfileFormValue: state.profilePage.posts,
        profilePages: state.profilePage
    }
}
// type mapDispatchToPropsType={
//     addPost: (newPostText:string) =>void,
//     deletePost: (postId:number) => void
// }
export type mapDispatchToPropsType ={
    deletePost:(postId:number)=>void
    addPost: (newPostText:string) =>void
}
type OwnPropsType={

}
let mapDispatchToProps = (dispatch:any) =>({
    addPost: (newPostText:string) => {dispatch(actions.addPostActionCreator(newPostText))},
    deletePost: (postId:number) => {dispatch(actions.deletePost(postId))}
})
export default  connect<mapStateToPropsProps, mapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPost)


