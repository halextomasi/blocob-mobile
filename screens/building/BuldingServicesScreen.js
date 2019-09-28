import React, { Component } from 'react'
import { StyleSheet, ScrollView, Picker } from 'react-native'

import { Input, Block, Text, Button, Switch } from '../../components';

import { theme, layout, mocks } from '../../constants';

class BuldingServicesScreen extends Component {

    state = {
        allDayReservation: false,
        language: 'haxe',
        firstLanguage: 'java',
        secondLanguage: 'js'
    }

    componentDidMount() {

    }

    render() {

        return (
            <Block>
                <Block flex={false} row space="between" style={styles.header2}>
                    <Text h3 bold gray2>Abertura do Chamado</Text>
                </Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Input label="Assunto do Chamado" style={styles.input} />
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Input
                                    editable={!this.state.allDayReservation}
                                    label="Data"
                                    style={styles.input} />
                            </Block>
                            <Block>
                                <Input
                                    editable={!this.state.allDayReservation}
                                    label="Hora"
                                    style={styles.input} />
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Input
                                    label="Local"
                                    style={styles.input} />
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Input
                                    label="Descrição"
                                    style={styles.inputBig} />
                            </Block>
                        </Block>
                        {/* <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>Valor</Text>
                                <Text bold>{'R$100,00'}</Text>
                            </Block>
                        </Block> */}
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Button gradient onpress>
                                    <Text bold white center> Enviar</Text>
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                </ScrollView>
            </Block>
        )
    }
}

BuldingServicesScreen.defaultProps = {
    //services: mocks.services
};

BuldingServicesScreen.navigationOptions = {
    title: 'Chamados Internos',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default BuldingServicesScreen;

const styles = StyleSheet.create({
    header: {
        //padding: theme.sizes.base * 2.5,
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 1.3
    },
    header2: {
        //padding: theme.sizes.base * 2,
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 1.2
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
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    inputBig: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 100
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2,
    },
    // header: {
    //     paddingHorizontal: theme.sizes.base * 2,
    // },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2,
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
