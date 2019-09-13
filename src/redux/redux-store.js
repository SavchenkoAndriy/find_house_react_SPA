import {applyMiddleware, combineReducers, createStore} from "redux";
import Main from "./reducers/main";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    Main: Main,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;