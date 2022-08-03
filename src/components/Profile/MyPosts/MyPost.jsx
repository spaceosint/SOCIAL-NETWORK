import React from 'react';
import classes from "./MyPosts.module.css"
import {Button, Form} from "react-bootstrap";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

let length10 = maxLengthCreator(10)
function AddNewPostForm(props){

    return(

            <Form onSubmit={props.handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Write what you're thinking</Form.Label>
                    <Field className="col-sm-12" name={"newPostText"} component={Textarea} validate={[required, length10]} placeholder={"Add post ..."}/>

                    <div className={classes.button}>

                        <button>New Post</button>
                    </div>
                </Form.Group>


            </Form>

    )
}

let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)

const MyPost = (props) => {


    let PostsElements = props.profilePages.posts.map(post => <Post key={post.id} src={post.src} massage={post.massage}/>)

    let  newPostElement = React.createRef()

    let  onAddPost=(values)=>{
        props.addPost(values.newPostText)
        // props.dispatch(addPostActionCreator())
    }
    let onPostChange =() => {
        let text = newPostElement.current.value
        // props.dispatch(updateNewPostTextActionCreator(text))
        props.updateNewPostText(text)

    }


    return (
        <div>
        <div className={`${classes.textareaPost} text-center`}>

            <AddNewPostFormRedux onSubmit={onAddPost}/>

        </div>
    <div className="border">
        {PostsElements}
    </div>
        </div>
    )
}



export default MyPost;