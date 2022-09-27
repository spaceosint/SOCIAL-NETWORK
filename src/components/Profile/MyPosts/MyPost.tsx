import React from 'react';
import classes from "./MyPosts.module.css"
import {Button, Form} from "react-bootstrap";
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import styles from "./Post/Post.module.css";
import {ProfileType} from "../../../types/type";
import {InitialStateType} from "../../../redux/profile-reducer";
import {mapStateToPropsProps, mapDispatchToPropsType} from "./MyPostsContainer";

let length10 = maxLengthCreator(10)
type PropsType ={

}
type AddPostFormValuesType={
    newPostText: string
}
const AddNewPostForm:React.FC<InjectedFormProps<AddPostFormValuesType, PropsType>&PropsType>=(props)=>{
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

let AddNewPostFormRedux = reduxForm<AddPostFormValuesType, {}>({form: "ProfileAddNewPostForm"})(AddNewPostForm)
type PropsTypeMyPost ={
    deletePost:(postId:number)=>void
    addPost: (newPostText:string) =>void
    ProfileFormValue: any
    profilePages: ProfileType
    // deletePost:(postId:number)=>void
    // profilePages: InitialStateType
    // addPost: (newPostText:string) =>void
    // ProfileFormValue:any
}
const MyPost:React.FC<mapStateToPropsProps & mapDispatchToPropsType & PropsTypeMyPost> = (props) => {

    // let DeleteClick =(postId:number)=>{
    //     props.deletePost(postId)
    // }



        // @ts-ignore
    let PostsElements = props.profilePages.posts.map(post =>
            <>
                <div className={styles.item}>
                    <Post key={post.id} src={post.src} massage={post.massage}/>
                    <span className={styles.delete} onClick={()=>{
                        props.deletePost(post.id)
                    }}>
            delete </span>
                </div>
            </>
        )





    // let  newPostElement = React.createRef()
    //
    let  onAddPost=(values:AddPostFormValuesType)=>{
        props.addPost(values.newPostText)
        // props.dispatch(addPostActionCreator())
    }
    // let onPostChange =() => {
    //     let text = newPostElement.current.value
    //     // props.dispatch(updateNewPostTextActionCreator(text))
    //     props.updateNewPostText(text)
    //
    // }


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