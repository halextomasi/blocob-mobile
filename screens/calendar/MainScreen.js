import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Card, Input, Block, Text } from '../../components';

import { theme, layout, mocks } from '../../constants';

class MainScreen extends Component {
    state = {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{ paddingTop: 50, flex: 1 }}>

            </View>
        )
    }
}

MainScreen.navigationOptions = {
    header: null,
};

export default MainScreen;

const styles = StyleSheet.create({
    header: {
        padding: theme.sizes.base * 2.5,
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 2
    },
});
