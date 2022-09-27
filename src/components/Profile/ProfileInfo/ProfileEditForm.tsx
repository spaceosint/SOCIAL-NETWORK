import React, {useEffect, useRef, useState} from "react";
import style from "./ProfileInfo.module.css";
import {Input} from "../../../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";
import {ContactsTyp} from "../../../types/type";

type PropsType ={
    initialValues: any
    error:any
    formValues:any
    contacts: any
    handleSubmit: any
}

const EditContactsForm:React.FC<PropsType> = ({handleSubmit, error, contacts, initialValues, formValues}) => {

    let [moreContacts, setMoreContacts] = useState(false)
    let [isDisabled, setIsDisabled] = useState(true)

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            setIsDisabled(initialValues.lookingForAJob)
            // @ts-ignore
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            setIsDisabled(!formValues.lookingForAJob)
        }
    });

    const ContactsClick = () => {
        moreContacts
            ?setMoreContacts(false)
            :setMoreContacts(true)


    }
    const formSubmit = () => {
        let x:HTMLElement|null = document.getElementById(style.btn);
        if (x != null){
            x.click()
        }
    }
    return (
        <>
            <span className={`${style.save} `} onClick={formSubmit}>
                <span>
                     Save
                </span>

            </span>

            <form onSubmit={handleSubmit}>
                {error && <div>
                    {error}
                </div>}
                <button id={style.btn}></button>
                <div className={`text-center ${style.contacts}`} onClick={ContactsClick}>Contacts</div>
                <ul className={`list-group ${moreContacts
                && style.hidenContacts}`}>
                    {Object.keys(contacts).map(key => {
                        return (
                            <Field name={`contacts.${key}`} key={key} component={Input} placeholder={key}/>
                        )
                    })}
                </ul>
                <div>
                    <label className="form-check-label"><b>Looking for a job: </b></label>
                    <div className="input-group md-3">
                        <div className="input-group-text ">
                            <Field className={`form-check-input `} name={"lookingForAJob"} component={Input}
                                   type={"checkbox"}/>
                        </div>
                        <Field className={`form-control ${isDisabled && style.disableField}`}
                               name={"lookingForAJobDescription"} component={Input}
                               type={"text"} placeholder="Job description... " disabled={isDisabled}/>
                    </div>
                    <label><b>About Me:</b></label>
                    <Field name={"aboutMe"} component={Input}
                           type={"text"} placeholder="About me... "/>
                    <label><b>Full Name:</b></label>
                    <Field name={"fullName"} component={Input}
                           type={"text"} placeholder="Full name "/>
                </div>
            </form>
        </>
    )
}
type test={
    contacts: Array<ContactsTyp>

}
// @ts-ignore
export const EditContactsFormReduxForm = reduxForm({form: 'contactsForm'})(EditContactsForm)