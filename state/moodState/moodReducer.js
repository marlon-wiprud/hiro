import * as types from "./mood.action.types";

const initialState = {
  chosenMood: ""
};

function moodReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_MOOD: {
      return Object.assign({}, state, {
        chosenMood: action.payload
      });
    }
    default:
      return state;
  }
}

export default moodReducer;
