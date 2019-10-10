import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View
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
import { Card, Input, Block, Text, Divider } from '../../components';
import { theme, layout, mocks } from '../../constants';
import FeatherIcons from 'react-native-vector-icons/Feather';


import firebase from 'firebase'
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";

class VotationScreen extends React.Component {
    state = {
        votations: [],
        modalTextConcluido: "Voto Computado!",
        modalNavigation: false,
        modalNavigationConcluido: false,
        showIndicator: true
    };

    componentDidMount() {
        var returnArr = [];

        firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Votacao').once('value', function (snapshot) {
            snapshot.forEach(function (snapshot) {
                var item = snapshot.val();
                item.key = snapshot.key;
                if (!item.Votado) {
                    returnArr.push(item);
                }
            })
        }).then(() => {
            this.setState({ showIndicator: false });
            this.setState({ votations: returnArr });
        });;
    }

    renderRequest(request) {
        return (
            <Block row card shadow color="white" style={styles.request}>
                <Block
                    flex={0.25}
                    card
                    column
                    style={styles.requestStatus}
                >
                    <MAIcon
                        name={request.Genero}
                        size={theme.sizes.base * 5}
                        color={theme.colors.gray2}
                    />
                </Block>
                <Block flex={0.75} column middle>
                    <Text h3 bold style={{ paddingVertical: 8, }}>{request.NomeCompleto}</Text>
                    <Text caption semibold>
                        •  {request.DataValidade} - {request.HoraValidade}
                    </Text>
                    <Text caption semibold>
                        •  {request.Observação}
                    </Text>
                </Block>
            </Block>
        );
    }

    votar(votation) {

        votation.Votado = true;
        console.log(votation.key);

        firebase.database().ref().child('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Votacao/' + votation.key)
            .update(votation).catch((error) => console.log(error)).then(() => {
                var returnArr = [];

                firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Votacao').once('value', function (snapshot) {
                    snapshot.forEach(function (snapshot) {
                        var item = snapshot.val();
                        item.key = snapshot.key;
                        if (!item.Votado) {
                            returnArr.push(item);
                        }
                    })
                }).then(() => {
                    this.setState({ showIndicator: false });
                    this.setState({ votations: returnArr });
                });
            });

        this.setState({ modalNavigationConcluido: true });

        setTimeout(() => {
            this.setState({ modalNavigationConcluido: false });
        }, 2000);
    }

    _renderModalContentConcluido = () => (
        <View style={styles.modalContent}>
            <Text h2>{this.state.modalTextConcluido}</Text>
        </View>
    );

    render() {

        const { visitors, showIndicator, votations } = this.state;

        return (
            <Block>
                <Modal isVisible={this.state.modalNavigationConcluido === true}>
                    {this._renderModalContentConcluido()}
                </Modal>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: theme.sizes.base * 2 }}>
                    <DotIndicator animating={showIndicator} color='#3f51b5' />

                    {votations.map(votation => (
                        <Block key={`requestBlock-${votation.key}`}>
                            <Text bold h3 center height={30}>{votation.Nome}</Text>
                            <Block flex={false} row space="between" style={styles.services}>


                                <TouchableOpacity onLongPress={() => this.votar(votation)}>
                                    <Card center middle shadow style={styles.service}>
                                        <Text medium center height={20}>{votation.Opcoes[0]}</Text>
                                    </Card>
                                </TouchableOpacity>
                                <TouchableOpacity onLongPress={() => this.votar(votation)}>
                                    <Card center middle shadow style={styles.service}>
                                        <Text medium center height={20}>{votation.Opcoes[1]}</Text>
                                    </Card>
                                </TouchableOpacity>


                                <Text medium height={20}>Descrição: {votation.Descricao}</Text>
                            </Block>
                            <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
                        </Block>
                    ))}
                </ScrollView>
            </Block >
        );
    }
}

VotationScreen.defaultProps = {
    requests: mocks.residents,
};

VotationScreen.navigationOptions = {
    title: 'Votações',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default VotationScreen;

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
    services: {
        flexWrap: 'wrap',
        padding: theme.sizes.base * 2,
        paddingHorizontal: theme.sizes.base * 2,
        // marginBottom: theme.sizes.base * 3.5,
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
