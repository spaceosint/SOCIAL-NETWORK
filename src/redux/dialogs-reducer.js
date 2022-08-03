const ADD_MESSAGE = 'ADD-MESSAGE';


export const addMessageActionCreator = (newMassage) => ({type: ADD_MESSAGE, newMassage})

const initialState = {

    dialogs: [{id: 1, name: 'John Doe', status:'Just now', massage:'Hello, Are you there?', new:'1', img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp'},
        {id: 2, name: 'Danny Smith', status:'5 mins ago', massage:'Lorem ipsum dolor sit.', new:'0', img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp'},
        {id: 3, name: 'Alex Steward', status:'Yesterday', massage:'Hello, Are you there?', new:'0', img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp'},
        {id: 4, name: 'Ashley Olsen', status:'Yesterday', massage:'Lorem ipsum dolor sit.', new:'0', img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp'},
        {id: 5, name: 'Kate Moss', status:'Yesterday', massage:'Lorem ipsum dolor sit.', new:'0', img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp'},
        {id: 6, name: 'Lara Croft', status:'Yesterday', massage:'Lorem ipsum dolor sit.', new:'0', img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp'},
        {id: 7, name: 'Brad Pitt', status:'5 mins ago', massage:'Hello, Are you there?', new:'0', img:'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp'},

    ],
    massages: [
        {id: 1, massage: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'},]


}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            debugger
            return {
                ...state,
                newMessage: '',
                massages: [...state.massages, {id: 2, massage: action.newMassage}]
            }

        default:
            return state
    }

    return state
}
export default dialogsReducer