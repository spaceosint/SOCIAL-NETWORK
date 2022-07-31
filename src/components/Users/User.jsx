import React from 'react'
import styles from "./users.module.css";
import UserIcon from '../../assets/images/profile_avatar.png'
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {toggleFollowingProgress} from "../../redux/users-reducer";
import {usersAPI} from "../../API/api";
import Paginator from "../../common/Paginator/Paginator";


let User = ({user, followingProgress, unfollow, follow}) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className={styles.peopleNearby}>

                            <div className={styles.nearbyUser}>
                                <div className="row">

                                        <div className="col-md-2 col-sm-2">
                                            <NavLink  to={'/profile/' + user.id}>
                                            <img src={user.photos.small != null ? user.photos.small : UserIcon} alt="user"
                                                 className={styles.profilePhotoLg}/>
                                            </NavLink>
                                        </div>

                                    <div className="col-md-7 col-sm-7">
                                        <NavLink className={`"profile-link" ${styles.username}`} to={'/profile/' + user.id}><h5>{user.name}</h5></NavLink>
                                        <p>Software Engineer</p>
                                        <p className="text-muted">{user.status}</p>
                                    </div>
                                    <div className="col-md-3 col-sm-3">
                                        {user.followed
                                            ? <button className="btn btn-primary pull-right" disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                                                unfollow(user.id)
                                            }}>UNFOLLOW</button>

                                            : <button className="btn btn-primary pull-right" disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                                                follow(user.id)
                                            }}>Add Friend</button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                {/*        <NavLink to={'/profile/' + user.id}>*/}
                {/*           <div className={`border ${styles.user} `} >*/}

                {/*               <img  src={user.photos.small != null ? user.photos.small : UserIcon}*/}
                {/*                 className={`${styles.user_photo}`}/>*/}

                {/*               <span className={`border ${styles.name} `} >{user.name}</span>*/}

                {/*               <span className={`border ${styles.status} `} > {user.status}</span>*/}


                {/*</div>*/}
                {/*        </NavLink>*/}


            {/*{user.followed*/}
            {/*            ? <button disabled={followingProgress.some(id => id === user.id)} onClick={() => {*/}
            {/*                unfollow(user.id)*/}
            {/*            }}>UNFOLLOW</button>*/}

            {/*            : <button disabled={followingProgress.some(id => id === user.id)} onClick={() => {*/}
            {/*                follow(user.id)*/}
            {/*            }}>FOLLOW</button>*/}
            {/*        }*/}





        </>
    )
}

export default User