import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redax-store";

let mapStateToPropsForRedirect = (state:AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapPropsType={
    isAuth: boolean
}
export function withAuthRedirect <WCP>(WrappedComponent: React.ComponentType<WCP>)  {
    class RedirectComponent extends React.Component<MapPropsType>{

        render() {
            let {isAuth, ...restProps} = this.props
            if (!isAuth){
                return (
                    <Navigate  to={'/login'} />
                )
            }
            return <WrappedComponent {...restProps as WCP} />
        }
    }
    let ConnectAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectAuthRedirectComponent
}