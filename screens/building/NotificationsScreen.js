import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

import React from "react";
import { Block, Text, Button } from '../../components';
import { theme, mocks } from '../../constants';

import firebase from 'firebase'

class MainScreen extends React.Component {
    state = {
        reservas: [],
        showIndicator: true
    };

    componentDidMount() {
        var returnArr = [];

        firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Notificacao').once('value', function (snapshot) {
            snapshot.forEach(function (snapshot) {
                var item = snapshot.val();
                item.key = snapshot.key;

                returnArr.push(item);
            })
        }).then(() => {
            console.log(returnArr);
            this.setState({ reservas: returnArr });
            this.setState({ showIndicator: false });
        });;
    }

    renderRequest(request) {
        return (
            <Block row card shadow color="white" style={styles.request}>
                <Block
                    flex={0.25}
                    card
                    column
                    style={styles.requestStatus}>
                    <Image
                        source={{ uri: request.Imagem }}
                        style={{ flex: 1 }}
                    />
                </Block>
                <Block flex={0.75} column middle>
                    <Text h3 bold style={{ paddingVertical: 8, }}>{request.Descricao}</Text>
                    <Text caption semibold>
                        Encarregado: {request.Encarregado}
                    </Text>
                    <Text caption semibold>
                        Dia: {request.Dia}
                    </Text>
                </Block>
            </Block>
        );
    }

    render() {

        const { reservas, showIndicator } = this.state;

        return (
            <Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.list}>
                        {reservas.map(reserva => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={`request-${reserva.key}`}>
                                {this.renderRequest(reserva)}
                            </TouchableOpacity>
                        ))}
                        <DotIndicator animating={showIndicator} color='#3f51b5' />
                    </Block>
                </ScrollView>
            </Block>
        );
    }
}

MainScreen.defaultProps = {
    //requests: mocks.residents,
};

MainScreen.navigationOptions = {
    title: 'Notificações',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default MainScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    list: {
        marginTop: theme.sizes.base,
        //paddingHorizontal: theme.sizes.base * 2,
    },
    inputs: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
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
    header: {
        padding: theme.sizes.base * 3,
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 1.3
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});
