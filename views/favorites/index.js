import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getFavorites } from "../../api/favorites";
import {
  saveFavorites,
  saveIdx,
  toggleFavoritesMode
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
    favorites: state.favoritesReducer.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveFavorites: favorites => dispatch(saveFavorites(favorites)),
    changePlayStatus: bool => dispatch(changePlayStatus(bool)),
    saveIdx: idx => dispatch(saveIdx(idx)),
    toggleFavoritesMode: () => dispatch(toggleFavoritesMode())
  };
};

class Favorites extends Component {
  constructor(props) {
    super(props);
  }

  loadFavorites = uid => {
    getFavorites(uid)
      .then(res => {
        this.props.saveFavorites(res);
      })
      .catch(err => console.log(err));
  };

  playTrack = (uri, idx) => {
    spotify
      .playURI(uri, 0, 0)
      .then(data => {
        this.props.changePlayStatus(true);
        this.props.toggleFavoritesMode();
        this.props.saveIdx(idx);
      })
      .catch(err => console.log(err));
  };

  render() {
    const favorites = this.props.favorites.map((fav, idx) => {
      return (
        <FavoriteCard
          key={idx}
          idx={idx}
          fav={fav}
          playTrack={() => this.playTrack(fav.uri, idx)}
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
          <Shuffle />
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
