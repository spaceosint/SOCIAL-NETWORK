import {Action, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    DialogsPage: dialogsReducer,
    UsersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    appJS: appReducer,
    form: formReducer,
});

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...arg:any)=>any }> = ReturnType<PropertiesType<T>>

export type BaseThunkType<AT extends Action, R=Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
let store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store