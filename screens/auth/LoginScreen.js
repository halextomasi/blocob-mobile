import React, { Component } from 'react';

import { Image, KeyboardAvoidingView, Dimensions } from 'react-native';

import { Button, Block, Text, Input } from '../../components';

//const { height } = Dimensions.get('window');

class Login extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView
                enabled
                behavior="padding"
                style={{ flex: 1 }}>

                <Block center middle>
                    <Block middle>
                        {/* <Image
                            source={require('../../assets/images/logo/Logo.png')}
                            style={{ height: 28, width: 102 }} /> */}

                    </Block>

                    <Block flex={2.5} center>

                        <Text h3 style={{ marginBottom: 0 }}>
                            Bloco B do Marquinho
                        </Text>

                        <Block center style={{ marginTop: 44 }}>

                            <Input
                                full
                                email
                                label="Mátricula"
                                style={{ marginBottom: 25 }} />

                            <Input
                                full
                                password
                                label="Senha"
                                style={{ marginBottom: 25 }}
                                rightLabel={
                                    <Text
                                        paragraph
                                        color="gray"
                                        onPress={() => navigation.navigate('Forgot')}>

                                        Esqueceu a senha?
                                    </Text>
                                }
                            />

                            <Button
                                full
                                style={{ marginBottom: 12 }}
                                onPress={() => navigation.navigate('Main')}>

                                <Text button>Log In</Text>

                            </Button>
                            {/* <Text paragraph color="gray">
                                Don't have an account?

                                    <Text height={18}
                                    color="blue"
                                    onPress={() => navigation.navigate('Register')}>

                                    Sign up
                                    </Text>
                            </Text> */}
                        </Block>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

export default Login;