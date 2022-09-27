import {ProfileType} from "../types/type";
import {InferActionsTypes} from "./redax-store";





export const actions={
    addMessage: (newMassage:string) => ({type: 'sn/dialogs/ADD-MESSAGE', newMassage} as const)
}
type ActionsType = InferActionsTypes<typeof actions>

export type DialogType ={
    id: number
    name: string
    status: string
    massage: string
    new: number
    img: string
}
type massages ={
    id: number
    massage: string
}
export const InitialState = {

    dialogs: [{id: 1, name: 'John Doe', status:'Just now', massage:'Hello, Are you there?', new:1, img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp'},
        {id: 2, name: 'Danny Smith', status:'5 mins ago', massage:'Lorem ipsum dolor sit.', new: 0, img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp'},
        {id: 3, name: 'Alex Steward', status:'Yesterday', massage:'Hello, Are you there?', new: 0, img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp'},
        {id: 4, name: 'Ashley Olsen', status:'Yesterday', massage:'Lorem ipsum dolor sit.', new: 0, img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp'},
        {id: 5, name: 'Kate Moss', status:'Yesterday', massage:'Lorem ipsum dolor sit.', new: 0, img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp'},
        {id: 6, name: 'Lara Croft', status:'Yesterday', massage:'Lorem ipsum dolor sit.', new: 0, img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp'},
        {id: 7, name: 'Brad Pitt', status:'5 mins ago', massage:'Hello, Are you there?', new: 0, img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp'},

    ] as Array<DialogType>,
    massages: [
        {id: 1, massage: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'},
        ] as Array<massages>
}
export type InitialStateType = typeof InitialState
const dialogsReducer = (state = InitialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'sn/dialogs/ADD-MESSAGE':
            debugger
            return {
                ...state,
                massages: [...state.massages, {id: 2, massage: action.newMassage}]
            }

        default:
            return state
    }

    return state
}
export default dialogsReducer