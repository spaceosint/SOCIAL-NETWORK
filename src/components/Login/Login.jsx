import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";


const LoginForm =({handleSubmit, error})=>{
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Email"}
                       name={"email"}
                       component={Input}
                       validate={required}
                />
            </div>
            <div>
                <Field placeholder={"Password"}
                       name={"password"}
                       type={"password"}
                       component={Input}
                       validate={required}
                />
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>
            { error && <div>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form:'login'})(LoginForm)

const Login = (props)=>{
    const onSubmit=(formData)=>{
        debugger
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth){return <Navigate replace to={"/profile"}/>}
    return(
        <>
        <h1> Login </h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}
const mapStateToProps =(state)=>({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login, logout})(Login)