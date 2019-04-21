import * as types from "./mood.action.types";
import { my_ip } from "../../vars";

const fetchUrl =
  "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion";
const subscriptionKey = "05052f29b95f472c8c295114c3b5fafc";

const imageUrl =
  "https://previews.123rf.com/images/believeinme33/believeinme331607/believeinme33160700620/61086651-portrait-of-young-angry-man-toned-photo-.jpg";

export const saveMood = mood => ({
  type: types.SAVE_MOOD,
  payload: mood
});

export const analyzeMood = img => {
  return dispatch => {
    fetch(`http://${my_ip}:3000/mood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ img })
    })
      .then(res => res.json())
      .then(json => {
        console.log("YOUR MOOD IS: ", json);
        dispatch(analyzeMoodSuccess(json.mood));
      })
      .catch(err => console.log(err));
  };
};

export const analyzeMoodSuccess = mood => ({
  type: types.ANALYZE_MOOD_SUCCESS,
  payload: mood
});
