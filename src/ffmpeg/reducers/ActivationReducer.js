const initialState = {
    isAuth: false,
    name: 'Samrat'
};
export function ActivationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                isAuth: action.payload
            }
        default:
            return state;
    }
}