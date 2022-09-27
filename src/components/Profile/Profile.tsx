import React from 'react';
import Avatar from "./Avatar/Avatar";
import MyPostContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../../common/preloader/preloader";
import ProfileInfoWithHooks from "./ProfileInfo/ProfileInfoWithHooks";
import {ProfileType} from "../../types/type";


type PropsType ={
    profile: ProfileType | null,
    status: string,
    authorizedUserId: number|null
    isAuth: boolean
    values: any
    isOwner: boolean


    getUsersThunk: (userID: number)=>void
    getStatusThunk: (userID: number)=>void
    updateStatusThunk: (status:string)=>void
    savePhotoThunk: (file:any)=>void
    saveFormContactsThunk: (formData:any)=>void
}

const Profile:React.FC<PropsType> = (props:PropsType) => {

    if (! props.profile){
        return <Preloader/>
    }
    return (
                <div className="row">
                <div className="col-sm-4 ">
                    <div >
                    <Avatar avatar={props.profile.photos?.large}/>
                    </div>
                    <ProfileInfoWithHooks
                        saveFormContactsThunk={props.saveFormContactsThunk}
                        savePhotoThunk={props.savePhotoThunk}
                        isOwner={props.isOwner}
                        profile={props.profile}
                        // fullName={props.profiel.fullName}
                        // aboutMe = {props.profiel.aboutMe}
                        // contacts={props.profiel.contacts}
                        // lookingForAJob ={props.profiel.lookingForAJob}
                        // lookingForAJobDescription = {props.profiel.lookingForAJobDescription}
                        status={props.status}
                        updateStatusThunk={props.updateStatusThunk}
                        values={props.values}
                    />
                </div>

                <div className="col-sm-8 ">
                <MyPostContainer/>
                </div>

            </div>
    )

}
export default Profile;



