const initialState = {
    user: {}
}

//action types
const GET_USER = 'GET_USER',
      CLEAR_USER = 'CLEAR_USER';

//actions to change initialState
export function getUser(userObj){
    return{
        type: GET_USER,
        payload: userObj
    }
}

export function clearUser(){
    return{
        type: CLEAR_USER,
        payload: {}
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_USER:
            return {...state, user: payload}
        case CLEAR_USER:
            return{...state, user: payload}
        default: 
            return state;
    }
}