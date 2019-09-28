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
    // var firebaseConfig = {
    //   apiKey: "AIzaSyCLE8DZppMmUl9-eikvCGlBBuejPnCCx9o",
    //   authDomain: "blocob-project.firebaseapp.com",
    //   databaseURL: "https://blocob-project.firebaseio.com",
    //   projectId: "blocob-project",
    //   storageBucket: "",
    //   messagingSenderId: "1077404714973",
    //   appId: "1:1077404714973:web:e7635382790814de"
    // };

    // // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);

    // firebase.database().ref('/reservas').on('value', snapshot => {
    //   let data = snapshot.val();
    //   let items = Object.values(data);
    //   console.log(items);
    // });
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
