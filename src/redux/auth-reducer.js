import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';


const initialState ={
    usersID: null,
    email: null,
    login:null,
    isAuth: false,
    isFetching: true,
}
const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_USER_DATA:{
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
export const getAuthUserData =()=> async (dispatch)=>{
    let response = await authAPI.me()
        if (response.data.resultCode=== 0){
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, login, email, true))

    }
}
export const login =(email, password, rememberMe=false)=>async(dispatch)=>{
    let response = await authAPI.login(email, password, rememberMe)


        if (response.data.resultCode=== 0){
            dispatch(getAuthUserData())
        }else{
            let massage = response.data.messages.length > 0 ? response.data.messages[0]: "Some error"
            dispatch(stopSubmit("login", {_error: massage}))
        }
}
export const logout =(email, password, rememberMe=false)=>async (dispatch)=>{

    let response = await authAPI.logout()

        if (response.data.resultCode=== 0){
            dispatch(setAuthUserData(null, null, null, false))
        }

}



export default authReducer