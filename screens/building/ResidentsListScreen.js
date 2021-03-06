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
import { Block, Text, Button } from '../../components';
import { theme, mocks } from '../../constants';

import firebase from 'firebase'
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";

class ResidentsListScreen extends React.Component {
    state = {
        visitors: [],
        modalTextConcluido: "Visitante Removido!",
        modalNavigation: false,
        modalNavigationConcluido: false,
        showIndicator: true
    };

    componentDidMount() {
        var returnArr = [];

        firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Visitantes').once('value', function (snapshot) {
            snapshot.forEach(function (snapshot) {
                var item = snapshot.val();
                item.key = snapshot.key;

                returnArr.push(item);
            })
        }).then(() => {
            this.setState({ showIndicator: false });
            this.setState({ visitors: returnArr });
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

                    <MAIcon
                        name={request.Genero}
                        size={theme.sizes.base * 5}
                        color={theme.colors.gray2} />


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

    apagarVisitante(text) {

        firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Visitantes/' + text).remove().then(() => {
            var returnArr = [];

            firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Visitantes').once('value', function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    var item = snapshot.val();
                    item.key = snapshot.key;

                    returnArr.push(item);
                })
            }).then(() => {
                this.setState({ showIndicator: false });
                this.setState({ visitors: returnArr });
            });;
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

        const { visitors, showIndicator } = this.state;

        return (
            <Block>
                <Modal isVisible={this.state.modalNavigationConcluido === true}>
                    {this._renderModalContentConcluido()}
                </Modal>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Button gradient onPress={() => this.props.navigation.navigate('ResidentInfoScreen')}>
                                    <Text bold white center> Novo Visitante</Text>
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                    <Block style={styles.list}>

                        {visitors.map(visitor => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={`request-${visitor.key}`}
                                onLongPress={() => this.apagarVisitante(visitor.key)}>
                                {this.renderRequest(visitor)}
                            </TouchableOpacity>
                        ))}

                        <DotIndicator animating={showIndicator} color='#3f51b5' />
                    </Block>
                </ScrollView>
            </Block>
        );
    }
}

ResidentsListScreen.defaultProps = {
    requests: mocks.residents,
};

ResidentsListScreen.navigationOptions = {
    title: 'Visitantes',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default ResidentsListScreen;

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
