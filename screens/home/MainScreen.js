import React, { Component } from 'react'
import { Animated, KeyboardAvoidingView, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import { Card, Input, Block, Text } from '../../components';
import { theme, layout, mocks } from '../../constants';


class MainScreen extends Component {

  state = {
    searchFocus: new Animated.Value(0.9),
    searchString: null,
    services: [],
  }

  componentDidMount() {
    this.setState({ services: this.props.services });
  }

  render() {

    const { searchFocus, searchString } = this.state;
    const isEditing = searchFocus && searchString;
    const { services } = this.state;

    return (
      <Block>
        <Block flex={false} center space="between" style={styles.header}>
          <Text h1 center bold gray2>
            BLOCO
                         <Text h1 gray semibold> B</Text>
          </Text>
        </Block>
        <Block flex={false} center space="between" style={styles.header2}>
          <Block middle animated flex={searchFocus} style={styles.search}>
            <Input
              placeholder="Digite o que você quer fazer..."
              placeholderTextColor={theme.colors.gray2}
              style={styles.searchInput}
              onChangeText={text => this.setState({ searchString: text })}
              value={searchString}
              onRightPress={() => isEditing ? this.setState({ searchString: null }) : null}
              rightStyle={styles.searchRight}
              rightLabel={
                <Icon
                  name={isEditing ? "close" : "search"}
                  size={theme.sizes.base / 1.6}
                  color={theme.colors.gray2}
                  style={styles.searchIcon}
                />
              }
            />
          </Block>
        </Block>
        <Block flex={false} row space="between" style={styles.header}>
          <Text h4 bold gray2>atalhos</Text>
        </Block>
        {/* <ScrollView> */}
        <Block flex={1} row space="between" style={styles.services}>
          {
            services.map(service => (
              <TouchableOpacity
                key={service.name}
              //onPress={() => navigation.navigate('Explore', POR)}
              >
                <Card center middle shadow style={styles.service}>
                  <IconIonicons
                    name={service.badgeIos}
                    size={theme.sizes.base * 1.3}
                    color={theme.colors.gray2}
                  />
                </Card>
              </TouchableOpacity>
            ))
          }
        </Block>
        {/* </ScrollView> */}
      </Block>
    )
  }
}


MainScreen.navigationOptions = {
  header: null,
};

MainScreen.defaultProps = {
  services: mocks.servicesHome
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: theme.sizes.base * 2.5,
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2
  },
  header2: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2
  },
  search: {
    height: theme.sizes.base * 2,
    width: layout.default.window.width - theme.sizes.base * 4,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: 'rgba(142, 142, 147, 0.06)',
    borderColor: 'rgba(142, 142, 147, 0.06)',
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent'
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  services: {
    //flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  service: {
    // this should be dynamic based on screen width
    minWidth: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 4,
    maxWidth: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 4,
    maxHeight: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 4
  }
});
