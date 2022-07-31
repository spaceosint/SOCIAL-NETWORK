import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    DialogsPage: dialogsReducer,
    UsersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    appJS: appReducer,
    form: formReducer,
});
let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store