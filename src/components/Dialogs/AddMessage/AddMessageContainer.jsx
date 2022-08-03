// import {Button, Form} from "react-bootstrap";
// import classes from "./AddMessage.module.css"
// import React from "react";
// import {addMessageActionCreator} from "../../../redux/dialogs-reducer";
// import AddMessageForm from "./AddMessage";
// import {connect} from "react-redux";
//
//
//
// //
// // const AddMessageContainer = (props) =>{
// //
// //     let state = props.store.getState()
// //
// //     let  addMessage=()=>{
// //
// //         props.store.dispatch(addMessageActionCreator())
// //     }
// //     let onMessageChange =(text) => {
// //         props.store.dispatch(updateNewMessageTextActionCreator(text))
// //
// //     }
// //
// //     return <AddMessage updateNewMessageTextActionCreator={onMessageChange} addMessageActionCreator={addMessage} MessageFormValue={state.DialogsPage.newMessage}/>
// //
// // }
//
// let mapStateToProps = (state) =>{
//     return{
//         MessageFormValue: state.DialogsPage
//     }
// }
// let mapDispatchToProps = (dispatch) =>{
//     return{
//
//         addMessageActionCreator: (newMassage) => {dispatch(addMessageActionCreator(newMassage))}
//
//     }
// }
// const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AddMessageForm)
// export default SuperDialogsContainer;