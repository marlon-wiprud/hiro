import * as types from "./user.action.types";

const initialState = {
  loggedIn: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_FIREBASE_SUCCESS: {
      return Object.assign({}, state, {
        uid: action.payload
      });
    }

    case types.REGISTER_HIRO_USER_SUCCESS: {
      return Object.assign({}, state, {
        loggedIn: true
      });
    }

    case types.REGISTER_FIREBASE_SUCCESS: {
      return Object.assign({}, state, {
        uid: action.payload
      });
    }

    case types.SAVE_CREATE_ACC_FORM: {
      const {
        email,
        firstname,
        lastname,
        password,
        retypePassword
      } = action.payload;

      return Object.assign({}, state, {
        email,
        firstname,
        lastname,
        password,
        retypePassword
      });
    }

    case types.SAVE_USER_PREF: {
      const { genre1, genre2, genre3, favoriteArtist } = action.payload;

      const genreArr = [genre1, genre2, genre3];

      return Object.assign({}, state, {
        genreArr,
        favoriteArtist
      });
    }

    default:
      return state;
  }
}

export default userReducer;
