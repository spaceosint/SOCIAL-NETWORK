import React from 'react';



const Post = (props) => {
    return (
        <>
            <img  src={props.src} />
            {props.massage}

        </>
    )

}
export default Post;