import React, { Component } from 'react'
import { StyleSheet, ScrollView, Picker } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Input, Block, Text, Button, Switch } from '../../components';

import { theme, layout, mocks } from '../../constants';

import firebase from 'firebase'

class ReservationScreen extends Component {

    state = {
        allDayReservation: false,
        date: new Date(),
        initHour: new Date(),
        endHour: new Date(),
        reservationName: "",
        buldingPlace: "",
        listBuildingPlace: [],
        reservationValue: 0
    }

    componentDidMount() {
        var returnArr = [];

        firebase.database().ref('Cliente/Condominio/Area Comum').once('value', function (snapshot) {
            snapshot.forEach(function (snapshot) {
                var item = snapshot.val();
                item.key = snapshot.key;

                returnArr.push(item);
            })
        }).then(() => {
            this.setState({ listBuildingPlace: returnArr });

            this.trocaValores(returnArr[0].key)
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

        console.log(data);

        this.setState({ reservationValue: data[0].Valor });
    }

    salvarReservar() {

    }

    render() {
        const { listBuildingPlace, reservationValue } = this.state;

        return (
            <Block>
                <Block flex={false} row space="between" style={styles.header2}>
                    <Text h3 bold gray2>Faça sua reserva!</Text>
                </Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Input onValueChange={(reservationName) => { this.setState({ reservationName }) }} label="Nome da Reserva" style={styles.input} />
                            </Block>
                        </Block>
                        <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                            <Block>
                                <Block flex={false} margin={[theme.sizes.base, 0]}>
                                    <Text gray2>Dia</Text>
                                    <DatePicker
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="select date"
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
                                <Button gradient onpress>
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
    }
});
