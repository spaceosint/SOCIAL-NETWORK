import React from  'react'
import User from "./User";
import Paginator from "../../common/Paginator/Paginator";
import {UsersType} from "../../types/type";

type PropsType={
    totalUsersCount: number
    pageSize: number
    portionSize?: number
    currentPage: number
    onPageChanged: (pageNumber:number)=> void
    users: Array<UsersType>
    followingProgress: Array<number|null & boolean|null>
    unfollow: (id:number)=> void
    follow: (id:number)=> void

}

let Users: React.FC<PropsType> = ({currentPage,
                                      onPageChanged,
                                      totalUsersCount,
                                      pageSize,
                                      users,
                                      followingProgress,
                                      unfollow,
                                      follow,
                                  }) =>
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
                users.map(u => <User key={u.id} user={u} followingProgress={followingProgress} unfollow={unfollow} follow={follow}></User>)
            }
        </div>
        )
    }

export default Users