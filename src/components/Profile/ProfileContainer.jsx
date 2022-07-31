import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatusThunk, getUsersThunk, updateStatusThunk} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withRouter} from "../../App";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {Navigate} from "react-router-dom";



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

    componentDidMount() {
        let userID = this.props.router.params.userID
        if (!userID){
            userID = this.props.authorizedUserId
            if (!userID){

            }
        }
        this.props.getUsersThunk(userID)
        this.props.getStatusThunk(userID)
    }

    render(){
    return (
        <Profile
            {...this.props}
            profiel={this.props.profile}
            ststus={this.props.status}
            updateStatus={this.props.updateStatusThunk}
        />
        )
    }
}




let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userid,
    isAuth: state.auth.isAuth
})

export default compose(
    withRouter,
    connect(mapStateToProps, {getUsersThunk, getStatusThunk, updateStatusThunk}),
)(ProfileContainer)

// let WithDataContainerComponent = withRouter(withAuthRedirect(ProfileContainer))
// export default connect(mapStateToProps, {getUsersThunk})(WithDataContainerComponent);



