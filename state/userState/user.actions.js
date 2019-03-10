import * as types from "./user.action.types";
import { my_ip } from "../../vars";


export const firebaseLoginSuccess = (uid) => ({
  type: types.LOGIN_FIREBASE_SUCCESS,
  payload: uid
})

export const saveCreateAccForm = data => ({
  type: types.SAVE_CREATE_ACC_FORM,
  payload: data
});

export const saveUserPref = userPref => ({
  type: types.SAVE_USER_PREF,
  payload: userPref
});

export const registerFirebaseSuccess = uid => ({
  type: types.REGISTER_FIREBASE_SUCCESS,
  payload: uid
});

export const registerHiroUser = data => {
  return dispatch => {
    console.log('===SENDING REGISTER HERO FETCH')
    fetch(`http://${my_ip}:3000/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        // do something
        console.log("====REGISTER HIRO USER SUCCESS====");
        dispatch(registerHiroUserSuccess());
      })
      .catch(err => console.log(err));
  };
};

export const registerHiroUserSuccess = () => ({
  type: types.REGISTER_HIRO_USER_SUCCESS
});

export const insertFavoriteGenres = data => {
  return dispatch => {
    fetch(`http://${my_ip}:3000/genre`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        // do something
        console.log("INSERT GENRE SUCCESS");
      })
      .catch(err => console.log(err));
  };
};

export const insertFavoriteArtist = data => {
  return dispatch => {
    fetch(`http://${my_ip}:3000/artist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        // do something
        console.log("INSERT ARTIST SUCCESS");
      })
      .catch(err => console.log(err));
  };
};
