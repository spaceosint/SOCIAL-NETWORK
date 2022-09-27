import React from 'react';
import classes from './Dialogs.module.css'
import {Navigate, NavLink} from "react-router-dom";
import AddMessageForm from "./AddMessage/AddMessage";
import {reduxForm} from "redux-form";
import {DialogType, InitialStateType} from "../../redux/dialogs-reducer";


const DialogItem: React.FC<DialogType> = (props) => {
    let path = "/dialogs/" + props.id
    return(
        <>
            <li className="p-2 border-bottom" >
                <NavLink to={path} className={` d-flex justify-content-between ${classes.linkBg}`}>
                    <div className="d-flex flex-row">
                        <img src={props.img}
                             alt="avatar"
                             className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                             width="60"/>
                        <div className="pt-1">
                            <p className="fw-bold mb-0">{props.name}</p>
                            <p className="small text-muted">{props.massage}</p>
                        </div>
                    </div>
                    <div className="pt-1">
                        <p className="small text-muted mb-1">{props.status}</p>
                        {props.new != 0
                        ? <span className="badge bg-danger float-end">1</span>
                        : <span></span>
                        }

                    </div>
                </NavLink>
            </li>

        </>


    )
}
const Message: React.FC<{massage: string}> = (props) => {

    return(
        <>
            <li className="d-flex justify-content-between mb-4">
                <div className="card w-100">
                    <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">Lara Croft</p>
                        <p className="text-muted small mb-0"><i className="far fa-clock"></i> 0 mins
                            ago</p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0">
                            {props.massage}
                        </p>
                    </div>
                </div>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
                     className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60"/>
            </li>

            {/*<div className={classes.message}>{props.massage} {props.id}</div>*/}
        </>



    )
}

type OwnPropsType = {
    PageDialog : InitialStateType
    addMessage: (messageText:string) => void
}

export type NewMassageFormType={
    newMassage: string
}


const Dialogs: React.FC<OwnPropsType> = (props) => {

    let DialogsElements = props.PageDialog.dialogs.map( dialog =>
        <DialogItem name={dialog.name} id={dialog.id}
                    status={dialog.status} massage={dialog.massage}
                    new={dialog.new} img={dialog.img}
        />
    )

    let MessagesElements = props.PageDialog.massages.map( massage =>
        <Message massage={massage.massage}/>
    )

    let  addMessage=(values: NewMassageFormType)=>{
        props.addMessage(values.newMassage)
    }

    return (
        <section className={classes.selection}>
            <div className="container py-5">

                <div className="row">

                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">

                        <div className="card">
                            <div className="card-body">

                                <ul className="list-unstyled mb-0">
                                    {DialogsElements}
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 col-lg-7 col-xl-8">

                        <ul className="list-unstyled">
                            <li className="d-flex justify-content-between mb-4">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                     className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"/>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between p-3">
                                        <p className="fw-bold mb-0">Brad Pitt</p>
                                        <p className="text-muted small mb-0"><i className="far fa-clock"></i> 12
                                            mins ago</p>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut
                                            labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>

                            </li>

                            {MessagesElements}
                            <AddMessageFormRedux onSubmit={addMessage}/>
                        </ul>

                    </div>

                </div>

            </div>

        </section>

    )
}

let AddMessageFormRedux = reduxForm<NewMassageFormType>({form: "AddNewMassageForm"})(AddMessageForm)



export default Dialogs;
