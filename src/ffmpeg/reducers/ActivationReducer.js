const initialState = {
    isActivate: false,
    isAuth: true,
    loggedInUser: null,
    loading_CheckActivation: false
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
        case 'SET_LOADING_CheckActivation':
            return {
                ...state,
                loading_CheckActivation: action.payload
            }
        default:
            return state;
    }
}