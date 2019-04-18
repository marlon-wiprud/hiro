import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import userReducer from "./userState/userReducer";
import spotifyReducer from "./spotifyState/spotifyReducer";
import moodReducer from "./moodState/moodReducer";
import favoritesReducer from "./favoritesState/favoritesReducer";

const reducer = combineReducers({
  userReducer,
  spotifyReducer,
  moodReducer,
  favoritesReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
