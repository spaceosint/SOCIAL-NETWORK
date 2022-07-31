import React from 'react';
import classes from './Avatar.module.css'
import ProfileAvatar from '../../../assets/images/profile_avatar.png'

const Avatar = (props) => {
    return (
        <div className={""}>
            <img src={props.avatar ?props.avatar : ProfileAvatar} className={`"rounded-3 border border-5" ${classes.avatar}`} width="150px"
                 alt="Avatar"/>
        </div>
    )
}
export default Avatar;