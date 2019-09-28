import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";

import React from "react";

import { Card, Input, Block, Text, Button } from '../../components';
import { theme, mocks } from '../../constants';


class ResidentsListScreen extends React.Component {
    state = {
        //fontsLoaded: false
    };

    // loadFonts() {
    //     return Font.loadAsync({
    //         "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    //         "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    //         "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    //         "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    //         "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf")
    //     });
    // }

    async componentDidMount() {
        // await this.loadFonts();
        // this.setState({ fontsLoaded: true });
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
                        •  {request.cpfNumber}
                    </Text>
                    <Text caption semibold>
                        •  {request.dataNascimento}
                    </Text>
                    <Text caption semibold>
                        •  {request.parentingGrade}
                    </Text>
                </Block>
            </Block>
        );
    }

    render() {

        const { requests, navigation } = this.props;

        return (
            <Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.list}>
                        {requests.map(request => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={`request-${request.id}`}
                                onPress={() => navigation.navigate("ResidentInfoScreen",
                                    {
                                        residentId: request.id
                                    })}>
                                {this.renderRequest(request)}
                            </TouchableOpacity>
                        ))}
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
    title: 'Moradores',
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
});
