import React from 'react';
import classes from './NavBAr.module.css'
import {NavLink} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'

const NavBar = () => {
    return (

        <nav className={`${classes.nav} `}>
            <div className={classes.item}>
                <NavLink to="/profile" className={classes.link}> Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/dialogs" className={classes.link}> Messages </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/users" className={classes.link}> Users </NavLink>
            </div>
            {/*<div className={classes.item}>*/}
            {/*    <NavLink to="/music" className={classes.link}> Music </NavLink>*/}
            {/*</div>*/}
            <div className={`${classes.item} border-top ${classes.settings}`}>
                <NavLink to="/settings" className={classes.link}> Settings </NavLink>
            </div>

        </nav>


)

}
export default NavBar;

