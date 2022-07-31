import React from 'react';
import classes from  './image.module.css'

const Image = () => {
    return (
            <div >
                <img className={classes.img}
                    src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                    />
            </div>
    )
}
export default Image;