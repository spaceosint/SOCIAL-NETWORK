import React from "react";
import App from "./App";

import ReactDOM from 'react-dom/client';
import {addPost, subscribe, updateNewPostText} from "./redux/state";
import store from "./redux/redax-store"
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = (state) => {
    root.render(

            <Provider store={store}>
            <App AppState={state} dispatch={store.dispatch.bind(store)} store={store}/>
            </Provider>

    );
}
rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree);