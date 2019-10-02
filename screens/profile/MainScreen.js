import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'

import { Card, Input, Block, Text, Button } from '../../components';
import { theme, layout, mocks } from '../../constants';
import FeatherIcons from 'react-native-vector-icons/Feather';

import firebase from 'firebase'

class MainScreen extends Component {

    state = {
        budget: 850,
        monthly: 1700,
        notifications: true,
        newsletter: false,
        editing: null,
        email: null,
        profile: {},
    }

    componentDidMount() {
        this.setState({ profile: this.props.profile });

        var returnArr = [];

        firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Usuarios/-LqAIpc6CFG14vquVe_B/').once('value', function (snapshot) {
            snapshot.forEach(function (snapshot) {
                var item = snapshot.val();
                item.key = snapshot.key;

                returnArr.push(item);
            })
            console.log(returnArr);
        }).then(() => {
            this.setState({ email: returnArr[0] });
        });;
    }

    atualizarEmail(text) {

        console.log(text);

        firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Usuarios/-LqAIpc6CFG14vquVe_B/').push({
            email: text
        });
    }


    render() {
        const { profile } = this.state;

        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text size={30} bold gray2>{profile.name}</Text>
                </Block>
                <Block flex={false} row center space="between" style={styles.header2}>
                    <Text size={15} gray2>{profile.apartament}</Text>
                    <Image source={profile.avatar}
                        style={styles.avatar}
                    />
                </Block>
                <Block flex={false} row space="between" style={styles.header}>
                    <Text h3 bold gray2>configurações</Text>
                </Block>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: theme.sizes.base * 2 }}
                >
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Input
                                    label="Email"
                                    style={styles.input}
                                    defaultValue={this.state.email}
                                    onChangeText={text => this.setState({ email: text })}
                                />
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Button gradient onPress={((text) => this.atualizarEmail(text))}>
                                    <Text bold white center> Atualizar</Text>
                                </Button>
                            </Block>
                        </Block>
                    </Block>


                </ScrollView >
            </Block >
        );
    }
}

MainScreen.navigationOptions = {
    header: null
};

MainScreen.defaultProps = {
    profile: mocks.profile,
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: theme.sizes.base * 4,
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base / 2
    },
    header2: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 2
    },
    header3: {
        paddingHorizontal: theme.sizes.base * 2
    },
    header4: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base / 2
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
    service2: {
        // this should be dynamic based on screen width
        minWidth: (layout.default.window.width - (theme.sizes.padding * 2.4)),
        maxWidth: (layout.default.window.width - (theme.sizes.padding * 2.4)),
        maxHeight: (layout.default.window.width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
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
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
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
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    inputs: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    sliders: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2,
    }
});