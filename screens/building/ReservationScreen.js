import React, { Component } from 'react'
import { StyleSheet, ScrollView, Picker, View, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Input, Block, Text, Button, Switch } from '../../components';

import { theme, layout, mocks } from '../../constants';
import Modal from "react-native-modal";

import firebase from 'firebase'
import moment from "moment";

class ReservationScreen extends Component {

    state = {
        allDayReservation: false,
        date: moment(new Date()).format("DD/MM/YYYY"),
        initHour: "00:00",
        endHour: "23:59",
        reservationName: "",
        buldingPlace: "",
        listBuildingPlace: [],
        reservationValue: 0,
        modalText: "Tudo Certo",
        modalTextConcluido: "Reserva Concluída!",
        modalNavigation: false,
        modalNavigationConcluido: false,
    }

    componentDidMount() {

        var returnArr = [];

        firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Bloco/-LoGSInTl2sbaILrluBD/AreaComum').once('value', function (snapshot) {
            snapshot.forEach(function (snapshot) {
                var item = snapshot.val();
                item.key = snapshot.key;

                returnArr.push(item);
            })
        }).then(() => {
            this.setState({ listBuildingPlace: returnArr });
            if (returnArr.length > 0) { this.trocaValores(returnArr[0].key) }
        });;
    }

    trocaValores(value) {
        this.setState({ buldingPlace: value })

        var lista = this.state.listBuildingPlace;

        var data = lista.filter(function (item) {
            return item.key == value;
        }).map(function (data) {
            return data;
        });

        this.setState({ reservationValue: data[0].Valor });
    }

    salvarReserva() {
        if (this.state.reservationName === "") {
            this.setState({ modalText: "Campo Nome da Reserva está vazio." });
            this.setState({ modalNavigation: true });
            return;
        }

        const { navigation } = this.props;

        firebase.database().ref('Cliente/Condominio/-LoGSIkzy2lKOU_dyBhn/Reservas').push({
            NomeReserva: this.state.reservationName,
            DiaReserva: this.state.date,
            HoraInicio: this.state.initHour,
            HoraFinal: this.state.endHour,
            Local: this.state.buldingPlace,
            Valor: this.state.reservationValue,
            Diaria: this.state.allDayReservation
        });

        this.setState({ modalNavigationConcluido: true });

        setTimeout(() => {
            this.setState({ modalNavigationConcluido: false });
            navigation.goBack();
        }, 2000);
    }

    goBack() {
        this.props.navigation.goBack();
    }

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text>{this.state.modalText}</Text>
            {this._renderButton('Fechar', () => this.setState({ modalNavigation: false }))}
        </View>
    );

    _renderModalContentConcluido = () => (
        <View style={styles.modalContent}>
            <Text h2>{this.state.modalTextConcluido}</Text>
        </View>
    );

    render() {
        const { listBuildingPlace, reservationValue } = this.state;

        return (
            <Block>
                <Modal isVisible={this.state.modalNavigation === true}>
                    {this._renderModalContent()}
                </Modal>
                <Modal isVisible={this.state.modalNavigationConcluido === true}>
                    {this._renderModalContentConcluido()}
                </Modal>
                <Block flex={false} row space="between" style={styles.header2}>
                    <Text h3 bold gray2>Faça sua reserva!</Text>
                </Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Input onChangeText={(name) => { this.setState({ reservationName: name }) }} label="Nome da Reserva" style={styles.input} />
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Block flex={false} margin={[theme.sizes.base, 0]}>
                                    <Text gray2>Dia</Text>
                                    <DatePicker
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="Dia"
                                        format="DD/MM/YYYY"
                                        minDate={new Date()}
                                        maxDate="31/12/2019"
                                        showIcon={false}
                                        confirmBtnText="Confirmar"
                                        cancelBtnText="Cancelar"
                                        customStyles={{
                                            dateInput: {
                                                borderLeftWidth: 0,
                                                borderWidth: StyleSheet.hairlineWidth,
                                                borderRightWidth: 0,
                                                borderTopWidth: 0,
                                                //height: theme.sizes.base * 3,
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />
                                </Block>
                            </Block>
                            <Block>
                                <Block flex={false} margin={[theme.sizes.base, 0]}>
                                    <Text gray2>Diária</Text>
                                    <Switch
                                        value={this.state.allDayReservation}
                                        onValueChange={allDayReservation => this.setState({ allDayReservation })}
                                    />
                                </Block>
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block flex={true} margin={[theme.sizes.base, 0]}>
                                <Block>
                                    <Text gray2>Início</Text>
                                    <DatePicker
                                        date={this.state.initHour}
                                        mode="time"
                                        disabled={this.state.allDayReservation}
                                        format="HH:mm"
                                        showIcon={false}
                                        confirmBtnText="Confirmar"
                                        cancelBtnText="Cancelar"
                                        customStyles={{
                                            dateInput: {
                                                borderLeftWidth: 0,
                                                borderWidth: StyleSheet.hairlineWidth,
                                                borderRightWidth: 0,
                                                borderTopWidth: 0
                                            }
                                        }}
                                        onDateChange={(initHour) => { this.setState({ initHour }) }}
                                    />
                                </Block>
                            </Block>
                            <Block>
                                <Block flex={true} margin={[theme.sizes.base, 0]}>
                                    <Text gray2>Fim</Text>
                                    <DatePicker
                                        date={this.state.endHour}
                                        mode="time"
                                        format="HH:mm"
                                        disabled={this.state.allDayReservation}
                                        minDate={this.state.initHour}
                                        showIcon={false}
                                        confirmBtnText="Confirmar"
                                        cancelBtnText="Cancelar"
                                        customStyles={{
                                            dateInput: {
                                                borderLeftWidth: 0,
                                                borderWidth: StyleSheet.hairlineWidth,
                                                borderRightWidth: 0,
                                                borderTopWidth: 0
                                            }
                                        }}
                                        onDateChange={(endHour) => { this.setState({ endHour }) }}
                                    />
                                </Block>
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Block flex={false} margin={[theme.sizes.base, 0]}>
                                    <Text gray2>Local</Text>
                                    <Picker
                                        selectedValue={this.state.buldingPlace}
                                        onValueChange={place => this.trocaValores(place)}
                                        style={{ height: 88 }}
                                        itemStyle={{ height: 88 }}
                                        mode="dropdown">
                                        {
                                            listBuildingPlace.map(place => (
                                                <Picker.Item label={place.Nome}
                                                    key={place.key}
                                                    value={place.key}
                                                />
                                            ))
                                        }
                                    </Picker>
                                </Block>
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>Valor</Text>
                                <Text h2 bold>R${reservationValue}</Text>
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Button gradient onPress={() => this.salvarReserva()}>
                                    <Text bold white center> Reservar</Text>
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                </ScrollView>
            </Block >
        )
    }
}

ReservationScreen.defaultProps = {
    //services: mocks.services
};

ReservationScreen.navigationOptions = {
    title: 'Reservas',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default ReservationScreen;

const styles = StyleSheet.create({
    header: {
        //padding: theme.sizes.base * 2.5,
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 1.3
    },
    header2: {
        //padding: theme.sizes.base * 2,
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
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2,
    },
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
