import React, {useEffect, useRef, useState} from 'react';
import style from "./ProfileInfo.module.css"
import {Input} from "../../../common/FormsControls/FormsControls";
import {Field, getFormValues, reduxForm} from "redux-form";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const ProfileInfoWithHooks = (props) => {
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
        props.updateStatus(status)
    }
    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }


    const onMainPhotoSelected = (e) => {
        if (e.target.files[0]) {
            props.savePhoto(e.target.files[0])
        }
    }


    const EditContactsClick = () => {
        if (isEditContacts === false) {
            setEditContacts(true)
        } else {
            setEditContacts(false)
        }

    }
    const onSubmit = (formData) => {
       props.saveFormContactsThunk(formData).then(()=>{
           setEditContacts(true)
       })



    }
    console.log(props.values)
    return (
        <>
            {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            <span>
                <h1>{props.fullName}</h1>
                <div className="col-sm-11">
            <b>Status: </b>
                    {!editMode &&
                        <span onDoubleClick={activateEditMode}> {props.status || "edit status"} </span>
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
                : <EditContactsFormReduxForm contacts={props.contacts} formValues={props.values} initialValues={props} onSubmit={onSubmit}/>
            }

        </>
    )
}
const EditContactsForm = ({handleSubmit, error, ...props}) => {

    let [moreContacts, setMoreContacts] = useState(false)
    let [isDisabled, setIsDisabled] = useState(true)

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            setIsDisabled(props.initialValues.lookingForAJob)
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            setIsDisabled(!props.formValues.lookingForAJob)

        }
    });

    const ContactsClick = () => {
        if (moreContacts === false) {
            setMoreContacts(true)
        } else {
            setMoreContacts(false)
        }

    }
    const formSubmit = () => {
        let x = document.getElementById(style.btn);
        x.click()
    }
    // console.log(props.initialValues)


    // console.log(props.initialValues.values)
    // const isDisabledField = () =>{
    //     isDisabled
    //         ? setIsDisabled(false)
    //         : setIsDisabled(true)
    // }
    console.log(props.contacts)
    return (
        <>
            <span className={`${style.save} `} onClick={formSubmit}>
                <span>
                     Save
                </span>

            </span>

            <form onSubmit={handleSubmit} >
                { error && <div>
                    {error}
                </div>}
                <button id={style.btn}></button>
                <div className={`text-center ${style.contacts}`} onClick={ContactsClick}>Contacts</div>
                <ul className={`list-group ${moreContacts
                && style.hidenContacts}`}>
                    {Object.keys(props.contacts).map(key=>{
                        return <Field name={`contacts.${key}`} key={key} component={Input} placeholder={key} />
                    })}
                </ul>
                <div >
                    <label className="form-check-label"><b>Looking for a job: </b></label>
                    <div className="input-group md-3">

                        <div className="input-group-text ">

                            <Field  className={`form-check-input `} name={"lookingForAJob"} component={Input}
                                   type={"checkbox"}  />

                        </div>
                        <Field className={`form-control ${isDisabled && style.disableField}`} name={"lookingForAJobDescription"} component={Input}
                               type={"text"} placeholder="Job description... " disabled={isDisabled}/>

                        {/*<input type="text" className="form-control" placeholder="Some text"/>*/}

                    </div>
                    <label ><b>About Me:</b></label>
                    <Field name={"aboutMe"} component={Input}
                           type={"text"} placeholder="About me... " />
                    <label ><b>Full Name:</b></label>
                    <Field name={"fullName"} component={Input}
                           type={"text"} placeholder="Full name " />
                </div>

                {/*    <div className={`form-check form-switch`}>*/}

                {/*        <Field className={"form-check-input"} name={"lookingForAJob"} component={Input} type={"checkbox"}/>*/}
                {/*        <label className="form-check-label" ><b>Looking For AJob</b></label>*/}
                {/*    </div>*/}

                {/*<div>My professional skills: <Field placeholder={"react..."} component={Input}/></div>*/}
            </form>
        </>
    )
}
const EditContactsFormReduxForm = reduxForm({form: 'contactsForm'})(EditContactsForm)

const ContactForm = ({contactTitle, contactValue}) => {
    return <li className={"list-group-item"}>{contactTitle}: {contactValue}</li>

}

const Contacts = (props) => {
    let [moreContacts, setMoreContacts] = useState(false)
    const ContactsClick = () => {
        if (moreContacts === false) {
            setMoreContacts(true)
        } else {
            setMoreContacts(false)
        }

    }
    return (
        <>
            <div className={`text-center ${style.contacts}`} onClick={ContactsClick}>Contacts</div>
            <ul className={`list-group ${moreContacts
            && style.hidenContacts

            }`}>
                {Object.keys(props.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.contacts[key]}/>
                })}
            </ul>
            <div><b>About me: </b>
                {props.aboutMe}
            </div>
            <div><b>Looking For AJob:</b>
                {props.lookingForAJob ? ' ✔' : ' ✖'}
            </div>
            {props.lookingForAJob
                && <div>My professional skills: {props.lookingForAJobDescription}</div>}
        </>
    )

}
const Contact = ({contactTitle, contactValue}) => {
    return <li className={"list-group-item"}>{contactTitle}: {contactValue}</li>

}


export default ProfileInfoWithHooks;