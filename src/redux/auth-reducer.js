import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {setCurrentPage} from "./users-reducer";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


const initialState ={
    usersID: null,
    email: null,
    login:null,
    isAuth: false,
    isFetching: true,
    isCaptchaUrl: null,
}
const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:{
            debugger
            return {

                ...state,
                ...action.payload,
            }
        }

        default:
            return state
    }

}

export const setAuthUserData = (userid, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userid, email, login, isAuth}})
export const getCaptchaUrlSuccess = (isCaptchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {isCaptchaUrl}})
export const getAuthUserData =()=> async (dispatch)=>{
    let response = await authAPI.me()
        if (response.data.resultCode=== 0){
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, login, email, true))

    }
}
export const login =(email, password, rememberMe=false, captcha=null)=>async(dispatch)=>{
    let response = await authAPI.login(email, password, rememberMe, captcha)


        if (response.data.resultCode=== 0){
            dispatch(getAuthUserData())
        }

        else{
            if(response.data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
            let massage = response.data.messages.length > 0 ? response.data.messages[0]: "Some error"
            dispatch(stopSubmit("login", {_error: massage}))
        }
}
export const logout =()=>async (dispatch)=>{

    let response = await authAPI.logout()

        if (response.data.resultCode=== 0){
            dispatch(setAuthUserData(null, null, null, false))
        }


}
export const getCaptchaUrl =()=>async (dispatch)=>{
    const response = await securityAPI.getCaptchaURrl()
    const captchaUrl = response.data.url
    debugger
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}



export default authReducer