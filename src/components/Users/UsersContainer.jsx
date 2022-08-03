import React from  'react'
import {connect} from 'react-redux';
import {
    followUser, setCurrentPage, toggleIsFetching,
    setUsers, setTotalUsersCount, toggleFollowingProgress,
    getUsersThunkCreator, unfollowUser,

} from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../../common/preloader/preloader";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching, getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";



class UsersContainer extends React.Component{

    componentDidMount() {
        const {currentPage, pageSize} = this.props
       this.props.getUsersThunkCreator(currentPage, pageSize)
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        const {pageSize} = this.props
        this.props.getUsersThunkCreator(pageNumber, pageSize)
    }
    render(){
        return (
            <>
                <Preloader isFetching={this.props.isFetching}/>
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.followUser}
                   unfollow={this.props.unfollowUser}
                   followingProgress={this.props.followingInProgress}
            />
            </>
        )
    }
}

let mapStateToProps =(state)=>{
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

let mapDispatchToProps = {
    followUser,
    unfollowUser,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress,
    getUsersThunkCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)