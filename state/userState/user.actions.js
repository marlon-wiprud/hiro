import * as types from "./user.action.types";
import firebase from "react-native-firebase";

export const saveCreateAccForm = data => ({
  type: types.SAVE_CREATE_ACC_FORM,
  payload: data
});

export const saveUserPref = userPref => ({
  type: types.SAVE_USER_PREF,
  payload: userPref
});

export const userRegistration = data => {
  return dispatch => {
    const {
      email,
      password,
      firstname,
      lastname,
      genreArr,
      favoriteArtist
    } = data;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userData => {
        const uid = userData.user.uid;
        dispatch(registerFirebaseSuccess(uid));
        dispatch(registerHiroUser(uid, firstname, lastname));
        dispatch(insertFavoriteArtist({ uid, favoriteArtist }));
        dispatch(insertFavoriteGenres({ uid, genreArr }));
      })
      .catch(err => console.log(err));
  };
};

export const registerFirebaseSuccess = uid => ({
  type: types.REGISTER_FIREBASE_SUCCESS,
  payload: uid
});

export const registerHiroUser = (uid, firstname, lastname) => {
  return dispatch => {
    const data = { uid, firstname, lastname };
    fetch("http://192.168.10.3:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        // do something
      })
      .catch(err => console.log(err));
  };
};

export const insertFavoriteGenres = data => {
  return dispatch => {
    fetch("http://192.168.10.3:3000/favorite_genre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        // do something
      })
      .catch(err => console.log(err));
  };
};

export const insertFavoriteArtist = data => {
  return dispatch => {
    fetch("http://192.168.10.3:3000/favorite_artist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        // do something
      })
      .catch(err => console.log(err));
  };
};
