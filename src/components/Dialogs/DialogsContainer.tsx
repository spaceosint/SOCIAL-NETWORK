import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {actions, InitialStateType} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redax-store";


let mapStateToProps = (state:AppStateType) =>{
    return{
        PageDialog: state.DialogsPage,
        isAuth: state.auth.isAuth,
    }
}
type MapStatePropsType={
    PageDialog: InitialStateType
    isAuth: boolean
}
// let MapDispatchPropsType=()=>{
//     addMessageActionCreator: actions.addMessage
// }
// type MapDispatchPropsType=typeof MapDispatchPropsType

type OwnPropsType={

}
//<React.ComponentType>
export default compose<React.ComponentType>(
    connect<MapStatePropsType, {  }, OwnPropsType, AppStateType>(mapStateToProps, {...actions}),
            withAuthRedirect,
)(Dialogs)

