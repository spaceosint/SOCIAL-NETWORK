import React from 'react';
import classes from './Header.module.css'
import {Breadcrumb} from "react-bootstrap";
import Profile from "../Profile/Profile";
import {Link, NavLink} from "react-router-dom";
import Post from "../Profile/MyPosts/Post/Post";
import Nav from 'react-bootstrap/Nav'


const Header = (props) => {

    return(
            <header className={classes.header}>
                <NavLink to="/profile"><img src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
                                            alt="..."/></NavLink>

                <span className={classes.logotip}> SOCIAL NETWORK</span> <span className={classes.club}>[CLUB 54+]</span>
                <span className={classes.login}>
                    {props.isAuth
                        ? <span> <NavLink to={'/profile'}> {props.login}  </NavLink> | <NavLink to={'/logout'} onClick={props.logout}>  Logout </NavLink> </span>
                        : <span><NavLink to={'/login'}> Login </NavLink> | <NavLink to={'/register'}>  Registrations </NavLink> </span>
                    }
                </span>

            </header>

    )

}
export default Header;