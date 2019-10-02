import React, { Component } from 'react'
import { Animated, KeyboardAvoidingView, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';

import { Card, Input, Block, Text } from '../../components';
import { theme, layout, mocks } from '../../constants';

class MainScreen extends Component {

  state = {
    searchFocus: new Animated.Value(0.9),
    searchString: null,
    services: [],
    news: [],
  }

  componentDidMount() {
    this.setState({ services: this.props.services });
    this.setState({ news: this.props.requests });
  }

  renderRequest(request) {
    return (
      <Block row card shadow color="white" style={styles.request}>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.requestStatus}
        >
          <Image
            source={{ uri: request.photoUrl }}
            style={{ flex: 1 }}
          />
        </Block>
        <Block flex={0.75} column middle>
          <Text h3 bold style={{ paddingVertical: 8, }}>{request.fullName}</Text>
          <Text caption semibold>
            Encarregado: {request.cpfNumber}
          </Text>
          <Text caption semibold>
            Dia: {request.dataNascimento}
          </Text>
        </Block>
      </Block>
    );
  }

  render() {

    const { searchFocus, searchString } = this.state;
    const isEditing = searchFocus && searchString;
    const { services } = this.state;

    const { news } = this.state;
    const { navigation } = this.props;

    return (
      <Block>
        <Block flex={false} center space="between" style={styles.header}>
          <Text h1 center bold gray2>
            BLOCO
            <Text h1 gray semibold> B</Text>
          </Text>
        </Block>
        <Block flex={false} row space="between" style={styles.header2}>
          <Text h3 bold gray2>atalhos</Text>
        </Block>
        <Block flex={0.5} row space="between" style={styles.services}>
          {
            services.map(service => (
              <TouchableOpacity
                key={service.name}
                onPress={() => navigation.navigate(service.pageNavigation)}
              >
                <Card center middle shadow style={styles.service}>
                  <FeatherIcons
                    name={service.badgeIos}
                    size={theme.sizes.base * 1.3}
                    color={theme.colors.gray2}
                  />
                  <Text height={20} style={{ fontSize: 8.5 }} >{service.name}</Text>
                </Card>
              </TouchableOpacity>
            ))
          }
        </Block>
        <Block flex={false} row space="between" style={styles.header}>
          <Text h3 bold gray2>avisos</Text>
        </Block>
        <Block row space="between" style={styles.servicesAlerts}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.list}>
              {news.map(obj => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={`request-${obj.id}`}>
                  {this.renderRequest(obj)}
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
        </Block>

      </Block >
    )
  }
}


MainScreen.navigationOptions = {
  header: null,
};

MainScreen.defaultProps = {
  services: mocks.servicesHome,
  requests: mocks.avisos
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: theme.sizes.base * 3,
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  header2: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2
  },
  header3: {
    paddingHorizontal: theme.sizes.base * 2
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
    paddingHorizontal: theme.sizes.base * 2,
    //paddingVertical: theme.sizes.base * 2,
    marginBottom: theme.sizes.base / 2,
  },
  servicesAlerts: {
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  service: {
    minWidth: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 4,
    maxWidth: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 4,
    maxHeight: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 4,
  },
  safe: {
    flex: 1,
    backgroundColor: theme.colors.primary
  },
  list: {
    marginTop: theme.sizes.base,
    //paddingHorizontal: theme.sizes.base * 2,
  },
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  request: {
    padding: 20,
    marginBottom: 15
  },
  requestStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90
  },
});
