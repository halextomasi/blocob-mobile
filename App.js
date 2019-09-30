import { AppLoading } from 'expo';
import React from 'react';
import { StyleSheet } from 'react-native';

import Navigation from './navigation/AppNavigator';

import { Block } from './components';

import firebase from 'firebase'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }


  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBL56oBf-LXjo38-o6Ll_3dVSs0waWmxKM",
      authDomain: "blocob-db.firebaseapp.com",
      databaseURL: "https://blocob-db.firebaseio.com",
      projectId: "blocob-db",
      storageBucket: "blocob-db.appspot.com",
      messagingSenderId: "1014517869255",
      appId: "1:1014517869255:web:ab621e9eeef1a609"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    // const cacheImages = images.map(image => {
    //   return Asset.fromModule(image).downloadAsync();
    // });

    // return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
      <Block white>
        <Navigation />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
});
