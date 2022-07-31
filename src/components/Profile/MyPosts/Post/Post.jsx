import React from 'react';
import classes from "./Post.module.css";


const Post = (props) => {

    return (

        <div className={classes.item}>
            <img  src={props.src} />
            {props.massage}
        </div>
    )

}
export default Post;