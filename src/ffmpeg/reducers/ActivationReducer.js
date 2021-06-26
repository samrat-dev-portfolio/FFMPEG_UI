const initialState = {
    isAuth: false
};
export function ActivationReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_AUTH':
            return action.payload;
        default:
            return state;
    }
}