import React from  'react'
import {connect} from 'react-redux';
import {
    actions,
    followUser,
    getUsersThunkCreator, unfollowUser,

} from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../../common/preloader/preloader";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching, getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";
import {UsersType} from "../../types/type";
import {AppStateType} from "../../redux/redax-store";


type MapStatePropsType={
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number|null & boolean|null>
}
type MapDispatchPropsType={
    getUsersThunkCreator: (currentPage:number, pageSize:number)=>void
    setCurrentPage: (pageNumber:number)=>void
    followUser: (id:number)=>void
    unfollowUser: (id:number)=>void
}
type OwnPropsType={
 //own props
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType>{

    componentDidMount() {
        const {currentPage, pageSize} = this.props
       this.props.getUsersThunkCreator(currentPage, pageSize)
    }
    onPageChanged = (pageNumber:number) => {
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

let mapStateToProps =(state:AppStateType):MapStatePropsType=>{
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
    getUsersThunkCreator,
    setCurrentPage: actions.setCurrentPage,
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, mapDispatchToProps)(UsersContainer)