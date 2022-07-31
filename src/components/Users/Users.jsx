import React from 'react'
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";


let Users = ({currentPage, onPageChanged,totalUsersCount, pageSize,  ...props}) =>
    {
        return (


            <div>
                <Paginator currentPage = {currentPage}
                           onPageChanged={onPageChanged}
                           totalUsersCount={totalUsersCount}
                           pageSize={pageSize}
                           portionSize={3}
                />

            {
                props.users.map(u => <User  kay={u.id} user={u} followingProgress={props.followingProgress} unfollow={props.unfollow} follow={props.follow}/>)
            }
        </div>
        )
    }

export default Users