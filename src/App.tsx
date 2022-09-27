import React from 'react';
import './App.css';
import NavBar from "./components/Navbar/NavBar";
import {
    HashRouter, BrowserRouter,
    Routes,
    Route,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader, {PreloaderMain} from "./common/preloader/preloader";
import {AppStateType} from "./redux/redax-store";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapPropsType= ReturnType<typeof  mapStateToProps>
type DispatchPropsType= {
    initializeApp: ()=>void
}


class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialState) {
            return <PreloaderMain/>
        }
        return (
            <HashRouter>

                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12">
                            <div className="row">
                                <HeaderContainer/>
                                <div className="col-sm-2">
                                    <NavBar/>
                                </div>
                                <div className="col-sm-10">
                                    <Routes>
                                        <Route path='/'
                                               element={<ProfileContainer/>}/>
                                        <Route path='/logout'
                                               element={<ProfileContainer/>}/>
                                        <Route path='/profile/:userID'
                                               element={<ProfileContainer/>}/>
                                        <Route path='/profile/'
                                               element={<ProfileContainer/>}/>
                                        <Route path='/dialogs/*'
                                               element={
                                                   <React.Suspense fallback={<PreloaderMain/>}>

                                            <DialogsContainer/>
                                                   </React.Suspense>
                                                       }/>
                                        {/*DialogsState={props.AppState.DialogsPage} dispatch={props.dispatch}*/}
                                        <Route path='/users/*'
                                               element={<UsersContainer/>}/>
                                        <Route path='/login/*'
                                               element={<Login/>}/>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </HashRouter>
        )
            ;
    }
}
// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
export function withRouter(Component:any) {
    function ComponentWithRouterProp(props:any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

const mapStateToProps=(state:AppStateType)=> ({
    initialState: state.appJS.initialState
})
export default compose(
    // withRouter,
    connect(mapStateToProps, {initializeApp}))
    (App)



