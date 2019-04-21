import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getFavorites, unfavorite } from "../../api/favorites";
import {
  saveFavorites,
  saveIdx,
  toggleFavoritesMode,
  saveShuffleList,
  toggleShuffleMode
} from "../../state/favoritesState/favorites.actions";
import { changePlayStatus } from "../../state/spotifyState/spotify.actions";
import styles from "./styles";
import { NavigationEvents } from "react-navigation";
import FavoriteCard from "../../components/favoriteCard";
import spotify from "rn-spotify-sdk";
import { Shuffle, Play } from "../../components/favoritesButtons";
// TODO: if track starts playing but buffers, the current position starts moving. when it actually starts playing, there is
// a reset in the current position but the interval is still going
const mapStateToProps = state => {
  return {
    uid: state.userReducer.uid,
    favorites: state.favoritesReducer.favorites,
    shuffleMode: state.favoritesReducer.shuffleMode,
    favoritesMode: state.favoritesReducer.favoritesMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveFavorites: favorites => dispatch(saveFavorites(favorites)),
    changePlayStatus: bool => dispatch(changePlayStatus(bool)),
    saveIdx: idx => dispatch(saveIdx(idx)),
    toggleFavoritesMode: () => dispatch(toggleFavoritesMode()),
    saveShuffleList: list => dispatch(saveShuffleList(list)),
    toggleShuffleMode: () => dispatch(toggleShuffleMode())
  };
};

class Favorites extends Component {
  constructor(props) {
    super(props);
  }

  deleteFavorite = (uid, uri) => {
    console.log("==RUNNING UNFAVORITE===");
    unfavorite(uid, uri)
      .then(favorites => this.props.saveFavorites(favorites))
      .catch(err => console.log(err));
  };

  loadFavorites = uid => {
    getFavorites(uid)
      .then(res => {
        console.log("unfavorite res ---->", res);
        this.props.saveFavorites(res);
      })
      .catch(err => console.log(err));
  };

  playTrack = (uri, idx) => {
    spotify
      .playURI(uri, 0, 0)
      .then(data => {
        this.props.changePlayStatus(true);
        if (!this.props.favoritesMode) this.props.toggleFavoritesMode();
        this.props.saveIdx(idx);
      })
      .catch(err => console.log(err));
  };

  shuffle = favorites => {
    // enter shuffle mode if not currently in shuffle mode
    if (!this.props.shuffleMode) this.props.toggleShuffleMode();

    // create array with value equal to corresponding index - i.e. [0,1,2,3,4]
    const shuffleArr = Array(favorites.length)
      .fill(null)
      .map((u, i) => i);

    // shuffle array to create playlist order
    for (let i = shuffleArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]]; // swap elements
    }

    // save list in global state to be accessed by favorites controller
    this.props.saveShuffleList(shuffleArr);

    // play first track in shuffle list
    const shuffleIdx = shuffleArr[0];
    const firstUri = this.props.favorites[shuffleIdx].uri;
    this.playTrack(firstUri, 0);

    console.log("SHUFFLE ARRAY --->", shuffleArr);
  };

  render() {
    const favorites = this.props.favorites.map((fav, idx) => {
      return (
        <FavoriteCard
          key={idx}
          idx={idx}
          fav={fav}
          playTrack={() => this.playTrack(fav.uri, idx)}
          unfavorite={() => this.deleteFavorite(this.props.uid, fav.uri)}
        />
      );
    });
    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={payload => this.loadFavorites(this.props.uid)}
        />
        <View
          style={{
            width: 200,
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Shuffle onPress={() => this.shuffle(this.props.favorites)} />
          <Play
            onPress={() => this.playTrack(this.props.favorites[0].uri, 0)}
          />
        </View>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.favContainer}>{favorites}</View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
