import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import userReducer from "./userState/userReducer";
import spotifyReducer from "./spotifyState/spotifyReducer";

const reducer = combineReducers({ userReducer, spotifyReducer });

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
