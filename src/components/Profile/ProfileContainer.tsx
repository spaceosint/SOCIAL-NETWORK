import React from 'react';
import Profile from "./Profile";
import {connect, MapStateToProps} from "react-redux";
import {compose} from "redux";
import {withRouter} from "../../App";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {getFormValues} from "redux-form";
import {
    getStatusThunk,
    getUsersThunk,
    saveFormContactsThunk,
    savePhotoThunk,
    updateStatusThunk
} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redax-store";
import {ProfileType} from "../../types/type";


type MapStatePropsType={
    profile: ProfileType | null,
    status: string,
    authorizedUserId: number|null
    isAuth: boolean
    values: any
}
type MapDispatchPropsType={
    getUsersThunk: (userID: number)=>void
    getStatusThunk: (userID: number)=>void
    updateStatusThunk: (status:string)=>void
    savePhotoThunk: (file:any)=>void
    saveFormContactsThunk: (formData:any)=>void
}
type OwnPropsType={
    router: any
    isOwner: boolean

}
// type ComponentPropsType={
//     router: any
//     isOwner: boolean
// }
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType>{
    refreshProfile(){

        let userID = this.props.router.params.userID
        if (!userID){
            userID = this.props.authorizedUserId
        }
        this.props.getUsersThunk(userID)
        this.props.getStatusThunk(userID)
    }
    componentDidMount() {
       this.refreshProfile()
    }
    componentDidUpdate(prevProps:PropsType, prevState:AppStateType) {
        if (this.props.router.params.userID !== prevProps.router.params.userID){
            this.refreshProfile()
        }
    }

    render(){

        return (
        <Profile
            {...this.props}
            saveFormContactsThunk={this.props.saveFormContactsThunk}
            savePhotoThunk={this.props.savePhotoThunk}
            isOwner={!this.props.router.params.userID}
            profile={this.props.profile}
            status={this.props.status}
            updateStatusThunk={this.props.updateStatusThunk}
            values = {this.props.values}
        />
        )
    }
}

let mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    values: getFormValues('contactsForm')(state),
})

export default compose(
    withRouter,
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, { getUsersThunk, getStatusThunk,
                                        updateStatusThunk, savePhotoThunk,
                                        saveFormContactsThunk}),
)(ProfileContainer)

// let WithDataContainerComponent = withRouter(withAuthRedirect(ProfileContainer))
// export default connect(mapStateToProps, {getUsersThunk})(WithDataContainerComponent);



