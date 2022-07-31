import {getAuthUserData} from "./auth-reducer";

let initialState ={
    initialState: false
}
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

const appReducer = (state = initialState, action) =>{
    switch (action.type){
        case INITIALIZED_SUCCESS:
            return{
                ...state,
                initialState: true
            }
        default:
            return  state
    }
}
export const initializedSuccess = () =>({type: INITIALIZED_SUCCESS})

export  const  initializeApp =() => (dispatch) => {
    let promise = dispatch(getAuthUserData())
   Promise.all([promise]).then(()=>{
        dispatch(initializedSuccess())
    })

}
export default appReducer