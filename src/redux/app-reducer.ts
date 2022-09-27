import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType, InferActionsTypes} from "./redax-store";

let initialState = {
    initialState: false
}

export type InitialStateType = typeof initialState



const appReducer = (state = initialState, action:ActionsType):InitialStateType  =>{
    switch (action.type){
        case 'sn/app/INITIALIZED_SUCCESS':
            return{
                ...state,
                initialState: true
            }
        default:
            return  state
    }
}
// export type  InitializedSuccessActionType = {
//     type: typeof INITIALIZED_SUCCESS
// }

export const actions={
    initializedSuccess: () =>({type: 'sn/app/INITIALIZED_SUCCESS'} as const)
}

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>

export  const  initializeApp =() => (dispatch:any) => {
    let promise = dispatch(getAuthUserData())
   Promise.all([promise]).then(()=>{
        dispatch(actions.initializedSuccess())
    })

}
export default appReducer