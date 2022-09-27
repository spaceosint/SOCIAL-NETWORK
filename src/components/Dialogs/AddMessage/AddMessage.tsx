import {Button, Form} from "react-bootstrap";
import classes from "./AddMessage.module.css"
import React from "react";

import {Field, InjectedFormProps} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {NewMassageFormType} from "../Dialogs";


const maxLength = maxLengthCreator(20)
type PropsType ={

}
const AddMessageForm: React.FC<InjectedFormProps<NewMassageFormType, PropsType> & PropsType> = (props) =>{


    return(

        <>
            <Form className={classes.form} onSubmit={props.handleSubmit}>

        <li className="bg-white mb-3">
            <div className="form-outline">
                <Field id="textAreaExample2" rows="4" className="form-control" component={Textarea} name={"newMassage"} validate={[required, maxLength]}/>
                <label className="form-label" htmlFor="textAreaExample2">Message</label>
            </div>
        </li>
            <button className="btn btn-info btn-rounded float-end">Send</button>

            </Form>

        </>
    )
}
export default AddMessageForm;