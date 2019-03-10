import * as types from "./mood.action.types";

const initialState = {
  chosenMood: "",
  analyzedMood: ""
};

function moodReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_MOOD: {
      return Object.assign({}, state, {
        chosenMood: action.payload
      });
    }

    case types.ANALYZE_MOOD_SUCCESS: {
      return Object.assign({},state, {
        analyzedMood: action.payload 
      })
    }
    default:
      return state;
  }
}

export default moodReducer;
