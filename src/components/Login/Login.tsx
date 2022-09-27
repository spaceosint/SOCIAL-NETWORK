import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {getCaptchaUrl, login, logout} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redax-store";


type LoginFormOwnPropsType = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> =({handleSubmit, error, captchaUrl})=>{
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
            {captchaUrl && <img src={captchaUrl}/> }
            {captchaUrl && <Field
                                  name={"captcha"}
                                  type={"text"}
                                  component={Input}
                                  validate={required}
            /> }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form:'login'})(LoginForm)


type MapStateToPropsType={
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToPropsType={
    login: (email:string, password:string, rememberMe:boolean, captcha:string|null)=>void
}
type LoginFormValuesType={
    captcha: string
    rememberMe: boolean
    email: string
    password: string
}
const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props)=>{
    const onSubmit=(formData:LoginFormValuesType)=>{

        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth){return <Navigate replace to={"/profile"}/>}
    return(
        <>
        <h1> Login </h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </>
    )
}
const mapStateToProps =(state:AppStateType):MapStateToPropsType=>({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.isCaptchaUrl
})
export default connect(mapStateToProps, {login, logout})(Login)