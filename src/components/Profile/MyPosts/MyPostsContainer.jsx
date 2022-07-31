import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPost from "./MyPost";
import Post from "./Post/Post";
import {connect} from "react-redux";
import {addMessageActionCreator} from "../../../redux/dialogs-reducer";



//
// const MyPostContainer = (props) => {
//
//     let state = props.store.getState()
//
//
//     let  addPost=()=>{
//         props.store.dispatch(addPostActionCreator())
//     }
//
//     let onPostChange =(text) => {
//         let action = updateNewPostTextActionCreator(text)
//         props.store.dispatch(action)
//     }
//
//     return (<MyPost updateNewPostText={onPostChange} addPost={addPost}  ProfileFormValue={state.profilePage.newPostText}/>)
// }
let mapStateToProps = (state) =>{
    return{
        ProfileFormValue: state.profilePage.newPostText,
        profilePages: state.profilePage
    }
}
let mapDispatchToProps = (dispatch) =>{
    return{
        // updateNewPostText: (text) => {
        //     let action = updateNewPostTextActionCreator(text)
        //     dispatch(action)
        // },
        addPost: (newPostText) => {dispatch(addPostActionCreator(newPostText))}

    }
}
const SuperPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)
export default SuperPostContainer;

