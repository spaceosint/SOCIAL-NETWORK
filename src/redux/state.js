// import profileReducer from "./profile-reducer";
// import dialogsReducer from "./dialogs-reducer";
// import sidebarReducer from "./sidebar-reducer";
//
//
// let store = {
//     _state: {
//         profilePage: {
//             newPostText: '',
//             posts: [
//                 {
//                     src: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Icecat1-300x300.svg',
//                     massage: 'Hi, how are you?'
//                 },
//                 {
//                     src: 'https://institut-economie-circulaire.fr/wp-content/uploads/2021/10/tete-panda-carree-300x300-1.png',
//                     massage: 'My first post'
//                 },
//                 {
//                     src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ooops_gaming-profile_image-f463465224619b84-300x300.png',
//                     massage: 'Hello world'
//                 },
//             ],
//         },
//         DialogsPage: {
//             newMessage: '',
//             dialogs: [{id: 1, name: 'Дима'},
//                 {id: 2, name: 'Вася'},
//                 {id: 3, name: 'Коля'},],
//             massages: [
//                 {id: 1, massage: 'Hi'},
//                 {id: 2, massage: 'Hello world'},
//                 {id: 3, massage: 'EZ GAME EZ LIFE IAM DEDINSIDE'},
//             ],
//         },
//         sidebar: {}
//     },
//     getState(){
//         return this._state
//     },
//     _collsubscriber() {
//         console.log("statr")
//     },
//     subscribe (observer){
//         this._collsubscriber = observer
//     },
//     dispatch(action){
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.DialogsPage = dialogsReducer(this._state.DialogsPage, action)
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//         this._collsubscriber(this._state)
//
//     //     if(action.type=== AAD_POST){
//     //
//     //             let nwePost = {
//     //                 src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ooops_gaming-profile_image-f463465224619b84-300x300.png',
//     //                 massage: this._state.profilePage.newPostText,
//     //             }
//     //             this._state.profilePage.posts.push(nwePost)
//     //             this._state.profilePage.newPostText=''
//     //             this._collsubscriber(this._state)
//     //
//     //     }
//     //     else if (action.type===UPDATE_NEW_POST_TEXT){
//     //         this._state.profilePage.newPostText = action.newText
//     //         this._collsubscriber(this._state)
//     //     }
//     //     else if (action.type===ADD_MESSAGE){
//     //         let nweMessage = {
//     //             id: 1,
//     //             massage: this._state.DialogsPage.newMessage,
//     //         }
//     //         this._state.DialogsPage.massages.push(nweMessage)
//     //         this._state.DialogsPage.newMessage=''
//     //         this._collsubscriber(this._state)
//     //     }
//     //     else if (action.type===UPDATE_NEW_MESSAGE_TEXT){
//     //         this._state.DialogsPage.newMessage = action.newMessage
//     //         this._collsubscriber(this._state)
//     //     }
//     },
// }
//
//
//
//
//
//
// export default store;