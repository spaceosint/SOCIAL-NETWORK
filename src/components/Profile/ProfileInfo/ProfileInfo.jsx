import React from 'react';


class ProfileInfo extends React.Component{

    state ={
        editMode: false,
        status: this.props.status
    }
    activateEditMode=()=>{

        this.setState({
           editMode: true
        })
    }
    deactivateEditMode=()=> {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e)=>{
        this.setState({status: e.currentTarget.value})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status != this.props.status){
            this.setState({status: this.props.status})
        }

    }


    render() {
    return (
        < >
            <span>
                <h1>{this.props.fullName}</h1>
                {!this.state.editMode &&
                    <p onDoubleClick={this.activateEditMode}> {this.props.status || "no status"} </p>

                }
                {this.state.editMode &&
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                }


           </span>
            <ul>
                {this.props.contacts.facebook ?<li><a href={`${this.props.contacts.facebook}`} >Facebook</a></li>: ''}
                {this.props.contacts.website ?<li><a href={`${this.props.contacts.website}`} >WebSite</a></li>: ''}
                {this.props.contacts.vk ?<li><a href={`${this.props.contacts.vk}`} >VK</a></li>: ''}
                {this.props.contacts.twitter ?<li><a href={`${this.props.contacts.twitter}`} >Twitter</a></li>: ''}
                {this.props.contacts.instagram ?<li><a href={`${this.props.contacts.instagram}`} >Instagram</a></li>: ''}
                {this.props.contacts.youtube ?<li><a href={`${this.props.contacts.youtube}`} >YouTube</a></li>: ''}
                {this.props.contacts.github ?<li><a href={`${this.props.contacts.github}`} >GitHub</a></li>: ''}
                {this.props.contacts.mainLink ?<li><a href={`${this.props.contacts.mainLink}`} >MainLink</a></li>: ''}

            </ul>
            <div> Looking For AJob:
                {this.props.lookingForAJob ?' ✔' : ' ✖'}
            </div>
            {this.props.lookingForAJobDescription}
        </>
    )
}
}
export default ProfileInfo;