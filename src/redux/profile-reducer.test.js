import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

//  test data
let  state = {

    posts: [
        {
            id: 1,
            src: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Icecat1-300x300.svg',
            massage: 'Hi, how are you?'
        },
        {
            id: 2,
            src: 'https://institut-economie-circulaire.fr/wp-content/uploads/2021/10/tete-panda-carree-300x300-1.png',
            massage: 'My first post'
        },
        {
            id: 3,
            src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ooops_gaming-profile_image-f463465224619b84-300x300.png',
            massage: 'Hello world'
        },
    ],

}

test('length of posts be incremented', () => {

    let action = addPostActionCreator("test-text")

        //  action
    let newState = profileReducer(state, action)
        //  expectation

        expect(newState.posts.length ).toBe(4)
});

test('after deleting length of messages should be decrement', () => {

    let action = deletePost(1)
    //  action
    let newState = profileReducer(state, action)
    //  expectation

    expect(newState.posts.length ).toBe(2)
});

test('after deleting length shouldnt be decrement if id is incorrect', () => {

    let action = deletePost(1000)
    //  action
    let newState = profileReducer(state, action)
    //  expectation

    expect(newState.posts.length ).toBe(3)
});
