import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatusThunk,
    getUsersThunk,
    saveFormContactsThunk,
    savePhotoThunk,
    updateStatusThunk
} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withRouter} from "../../App";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {Navigate} from "react-router-dom";
import {getFormValues} from "redux-form";



// // wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return (
//             <Component
//                 {...props}
//                 router={{ location, navigate, params }}
//             />
//         );
//     }
//
//     return ComponentWithRouterProp;
// }

class ProfileContainer extends React.Component{
    refreshProfile(){
        let userID = this.props.router.params.userID
        if (!userID){
            userID = this.props.authorizedUserId
            if (!userID){

            }
        }
        this.props.getUsersThunk(userID)
        this.props.getStatusThunk(userID)
    }
    componentDidMount() {
       this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userID !== prevProps.router.params.userID){
            this.refreshProfile()
        }

    }

    render(){
    return (
        <Profile
            {...this.props}
            saveFormContactsThunk={this.props.saveFormContactsThunk}
            savePhoto={this.props.savePhotoThunk}
            isOwner={!this.props.router.params.userID}
            profiel={this.props.profile}
            ststus={this.props.status}
            updateStatus={this.props.updateStatusThunk}
            values = {this.props.values}
        />
        )
    }
}




let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userid,
    isAuth: state.auth.isAuth,
    values: getFormValues('contactsForm')(state),
})

export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getUsersThunk, getStatusThunk, updateStatusThunk, savePhotoThunk, saveFormContactsThunk}),
)(ProfileContainer)

// let WithDataContainerComponent = withRouter(withAuthRedirect(ProfileContainer))
// export default connect(mapStateToProps, {getUsersThunk})(WithDataContainerComponent);



