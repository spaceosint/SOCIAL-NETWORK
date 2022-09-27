import {ResultCodesEnum} from "../API/api";
import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redax-store";
import {authAPI} from "../API/auth-api";
import {securityAPI} from "../API/security-api";


const initialState = {
    userId: null as number| null,
    email: null as string | null,
    login: null as string | null,
    isCaptchaUrl: null as string | null,
    isAuth: false,
    isFetching: true,

}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action:ActionsType):InitialStateType =>{
    switch (action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':{
            return {
                ...state,
                ...action.payload,
            }
        }

        default:
            return state
    }

}


export const actions={
    setAuthUserData: (userId: number | null, email:string | null, login:string | null, isAuth:boolean) =>
        ({type: 'auth/SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (isCaptchaUrl:string) => ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: {isCaptchaUrl}} as const)
}



type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

type ActionsType = InferActionsTypes<typeof actions>

export const getAuthUserData =():ThunkType=> async (dispatch)=>{
    let MeData = await authAPI.me()
        if (MeData.resultCode === ResultCodesEnum.Success){
            let {id, login, email} = MeData.data
            dispatch(actions.setAuthUserData(id, login, email, true))
    }
}

export const login =(email:string, password:string, rememberMe:boolean=false, captcha:string|null=null):ThunkType=>async(dispatch)=>{
    let LoginData = await authAPI.login(email, password, rememberMe, captcha)
        if (LoginData.resultCode=== ResultCodesEnum.Success){
            dispatch(getAuthUserData())
        }
        else{
            if(LoginData.resultCode === ResultCodesEnum.CaptchaIsRequired){
                dispatch(getCaptchaUrl())
            }
            let massage = LoginData.messages.length > 0 ? LoginData.messages[0]: "Some error"
            dispatch(stopSubmit("login", {_error: massage}))
        }
}
export const logout =():ThunkType=>async (dispatch)=>{
    let response = await authAPI.logout()
        if (response.data.resultCode=== 0){
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
}
export const getCaptchaUrl =():ThunkType=>async (dispatch)=>{
    const data = await securityAPI.getCaptchaURrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}



export default authReducer