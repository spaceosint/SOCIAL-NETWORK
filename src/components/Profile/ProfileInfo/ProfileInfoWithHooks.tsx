import React, {useEffect, useRef, useState} from 'react';
import style from "./ProfileInfo.module.css"
import {EditContactsFormReduxForm} from "./ProfileEditForm";
import {ContactsTyp, ProfileType} from "../../../types/type";

type PropsType={
    status: string
    isOwner: boolean
    profile: ProfileType
    values: any


    savePhotoThunk: (file:any)=>void
    updateStatusThunk: (status:string)=>void


    saveFormContactsThunk: (formData:any)=> any | void
}
const ProfileInfoWithHooks:React.FC<PropsType> = (props:PropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [isEditContacts, setEditContacts] = useState(true)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let activateEditMode = () => {
        setEditMode(true)
    }
    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatusThunk(status)
    }
    let onStatusChange = (e:any) => {
        setStatus(e.currentTarget.value)
    }
    const onMainPhotoSelected = (e:any) => {
        if (e.target.files[0]) {
            props.savePhotoThunk(e.target.files[0])
        }
    }

    const EditContactsClick = () => {
        isEditContacts
            ? setEditContacts(false)
            : setEditContacts(true)
    }
    const onSubmit = (formData:any) => {
        props.saveFormContactsThunk(formData).then(() => {
            setEditContacts(true)
        })
    }


    return (
        <>
            {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            <span>
                <h1>{props.profile.fullName}</h1>
                <div className="col-sm-11">
            <b>Status: </b>
                    {!editMode &&
                        <span onDoubleClick={activateEditMode}> {props.profile.status || "edit status"} </span>
                    }
                    {editMode &&
                        <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                    }

                </div>
            </span>
            <span className={` text-center ${style.edit}`} onClick={EditContactsClick}>
                <span>
                    {isEditContacts ? <span>Edit profile</span> : <span>Close</span>}
                </span>
            </span>

            {isEditContacts

                ? <Contacts {...props}/>
                // @ts-ignore
                : <EditContactsFormReduxForm contacts={props.profile.contacts} formValues={props.values}  initialValues={props}
                                             onSubmit={onSubmit}/>
            }

        </>
    )
}

type ContactsPropsType={
    profile: ProfileType
}

const Contacts = (props:ContactsPropsType) => {
    let [moreContacts, setMoreContacts] = useState(false)
    const ContactsClick = () => {
        moreContacts
            ?setMoreContacts(false)
            :setMoreContacts(true)
    }
    return (
        <>
            <div className={`text-center ${style.contacts}`} onClick={ContactsClick}>Contacts</div>
            <ul className={`list-group ${moreContacts
            && style.hidenContacts
            }`}>
                {props.profile.contacts

                   && Object.keys(props.profile.contacts).map(key => {

                    return (
                        <>
                            {/*@ts-ignore*/}
                            {props.profile.contacts[key] &&
                                // @ts-ignore
                                <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>}
                        </>
                    )
                })}
            </ul>
            <div><b>About me: </b>
                {props.profile.aboutMe}
            </div>
            <div><b>Looking For AJob:</b>
                {props.profile.lookingForAJob ? ' ✔' : ' ✖'}
            </div>
            {props.profile.lookingForAJob
                && <div>My professional skills: {props.profile.lookingForAJobDescription}</div>}
        </>
    )

}
type ContactPropsType={
    contactTitle: string
    contactValue: string
}
const Contact = ({contactTitle, contactValue}:ContactPropsType) => {
    return <li className={"list-group-item"}>{contactTitle}: {contactValue}</li>

}


export default ProfileInfoWithHooks;