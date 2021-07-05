const initialState = {
    isActivate: false,
    isAuth: false,
    loggedInUser: null,
};
export function ActivationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                isAuth: action.payload
            }
        case 'SET_ACTIVATION':
            return {
                ...state,
                isActivate: action.payload
            }
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.payload
            }
        default:
            return state;
    }
}