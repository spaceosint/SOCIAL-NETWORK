import React from 'react';
// import classes from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import Image from "./Image/Image";
import Avatar from "./Avatar/Avatar";
import MyPost from "./MyPosts/MyPost";
import {addPost, updateNewPostText} from "../../redux/state";
import MyPostContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../../common/preloader/preloader";
import { Navigate } from "react-router-dom";
import ProfileInfoWithHooks from "./ProfileInfo/ProfileInfoWithHooks";




const Profile = (props) => {

    if (! props.profiel){
        return <Preloader/>
    }
    return (


                <div className="row">
                    {/*<div className="text-center">*/}
                    {/*    <Image />*/}
                    {/*</div>*/}

                <div className="col-sm-4 ">
                    <div >
                    <Avatar avatar={props.profiel.photos.large}/>
                    </div>
                    <ProfileInfoWithHooks
                        fullName={props.profiel.fullName}
                        aboutMe = {props.profiel.aboutMe}
                        contacts={props.profiel.contacts}
                        lookingForAJob ={props.profiel.lookingForAJob}
                        lookingForAJobDescription = {props.profiel.lookingForAJobDescription}
                        status={props.status}
                        updateStatus={props.updateStatus}
                    />
                </div>

                <div className="col-sm-8 ">
                <MyPostContainer/>
                </div>

            </div>



    )

}
export default Profile;



