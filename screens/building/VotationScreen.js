import React, { Component } from 'react'
import { Animated, KeyboardAvoidingView, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcons from 'react-native-vector-icons/Feather';

import { Card, Input, Block, Text } from '../../components';

import { theme, layout, mocks } from '../../constants';

class VotationScreen extends Component {

    state = {
        services: [],
    }

    componentDidMount() {
        this.setState({ services: this.props.services });
    }

    render() {
        const { navigation } = this.props;
        const { services } = this.state;

        return (
            <Block>
                <Block flex={false} row space="between" style={styles.header}>
                    <Text h3 bold gray2>Faça sua reserva!</Text>
                </Block>
            </Block>
        )
    }
}

VotationScreen.navigationOptions = {
    title: 'Votação',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

VotationScreen.defaultProps = {
    services: mocks.services
};

export default VotationScreen;

const styles = StyleSheet.create({
    header: {
        padding: theme.sizes.base * 3,
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 1.3
    },
    header2: {
        padding: theme.sizes.base * 2,
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 1.3
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
        flexWrap: 'wrap',
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: theme.sizes.base * 3.5,
    },
    service: {
        // this should be dynamic based on screen width
        minWidth: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        maxWidth: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        maxHeight: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    },
    service2: {
        // this should be dynamic based on screen width
        minWidth: (layout.default.window.width - (theme.sizes.padding * 2.4)),
        maxWidth: (layout.default.window.width - (theme.sizes.padding * 2.4)),
        maxHeight: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    }
});
