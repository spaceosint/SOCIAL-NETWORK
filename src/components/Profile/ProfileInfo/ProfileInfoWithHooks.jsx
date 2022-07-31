import React, {useEffect, useState} from 'react';


const  ProfileInfoWithHooks = (props)=>{
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    }, [props.status])


    let activateEditMode=()=>{

        setEditMode(true)
    }
    let deactivateEditMode=()=> {
        setEditMode(false)
        props.updateStatus(status)
    }
    let onStatusChange = (e)=>{
        setStatus(e.currentTarget.value)
    }
    return (
        < >
            <span>
                <h1>{props.fullName}</h1>
                <div className="col-sm-11">

                    {!editMode &&
                        <p onDoubleClick={activateEditMode}> {props.status || "no status"} </p>

                    }
                    {editMode &&
                        <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                    }

                </div>



           </span>
            <ul>
                {props.contacts.facebook ?<li><a href={`${props.contacts.facebook}`} >Facebook</a></li>: ''}
                {props.contacts.website ?<li><a href={`${props.contacts.website}`} >WebSite</a></li>: ''}
                {props.contacts.vk ?<li><a href={`${props.contacts.vk}`} >VK</a></li>: ''}
                {props.contacts.twitter ?<li><a href={`${props.contacts.twitter}`} >Twitter</a></li>: ''}
                {props.contacts.instagram ?<li><a href={`${props.contacts.instagram}`} >Instagram</a></li>: ''}
                {props.contacts.youtube ?<li><a href={`${props.contacts.youtube}`} >YouTube</a></li>: ''}
                {props.contacts.github ?<li><a href={`${props.contacts.github}`} >GitHub</a></li>: ''}
                {props.contacts.mainLink ?<li><a href={`${props.contacts.mainLink}`} >MainLink</a></li>: ''}

            </ul>
            <div> Looking For AJob:
                {props.lookingForAJob ?' ✔' : ' ✖'}
            </div>
            {props.lookingForAJobDescription}
        </>
    )
}


export default ProfileInfoWithHooks;