import { combineReducers } from "redux";
import { ActivationReducer } from "./ActivationReducer";

const rootReducer = combineReducers({
    activation: ActivationReducer
});

export default rootReducer;