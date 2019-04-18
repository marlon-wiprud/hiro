import { my_ip } from "../vars";

export const addFavorite = (data, uid) => {
  console.log("DATA===> ", data);
  console.log("UID===> ", uid);

  return new Promise((resolve, reject) => {
    fetch(`http://${my_ip}:3000/favorites/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

export const getFavorites = uid => {
  return new Promise((resolve, reject) => {
    fetch(`http://${my_ip}:3000/favorites/${uid}`)
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};
