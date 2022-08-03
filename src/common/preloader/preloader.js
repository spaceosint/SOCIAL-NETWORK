import PreloaderSVG from "../../assets/images/preloader.svg";
import React from 'react';

let Preloader = (props) => {
    return(
        <>
        {props.isFetching && <img src={PreloaderSVG}/> }
        </>
        )
}
export default Preloader

export let PreloaderMain = (props) => {
    return(
        <>
        <img src={PreloaderSVG}/>
        </>
        )
}
