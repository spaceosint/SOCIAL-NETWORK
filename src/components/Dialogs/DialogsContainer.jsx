import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";



//
// const AddMessageContainer = (props) =>{
//
//     let state = props.store.getState()
//
//     let  addMessage=()=>{
//
//         props.store.dispatch(addMessageActionCreator())
//     }
//     let onMessageChange =(text) => {
//         props.store.dispatch(updateNewMessageTextActionCreator(text))
//
//     }
//
//     return <AddMessage updateNewMessageTextActionCreator={onMessageChange} addMessageActionCreator={addMessage} MessageFormValue={state.DialogsPage.newMessage}/>
//
// }




let mapStateToProps = (state) =>{
    return{
        PageDialog: state.DialogsPage,
        isAuth: state.auth.isAuth,
    }
}
let mapDispatchToProps = (dispatch) =>{
    return{
        addMessageActionCreator: (newMassage) => {dispatch(addMessageActionCreator(newMassage))}
    }
}
export default compose(
    connect(mapStateToProps,
            mapDispatchToProps),
            withAuthRedirect,
)(Dialogs)

