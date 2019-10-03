// native
import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import axios from 'axios';
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'

const recordingOptions = {
    // android not currently in use. Not getting results from speech to text with .m4a
    // but parameters are required
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

class MicButton extends Component {

    constructor(props) {
        super(props);
        this.recording = null;
        this.state = {
            isFetching: false,
            isRecording: false,
            modalNavigation: false,
            modalText: ""
        }
    }

    deleteRecordingFile = async () => {
        //console.log("Deleting file");
        try {
            const info = await FileSystem.getInfoAsync(this.recording.getURI());
            await FileSystem.deleteAsync(info.uri);
        } catch (error) {
            //console.log("There was an error deleting recording file", error);
        } yarn
    }

    getTranscription = async () => {
        this.setState({ isFetching: true });

        try {
            console.log(this.recording.getURI())
            const info = await FileSystem.getInfoAsync(this.recording.getURI());
            const uri = info.uri;

            let uriParts = uri.split('.');
            let fileType = uriParts[uriParts.length - 1];

            const formData = new FormData();

            formData.append('', {
                uri,
                name: `recording.${fileType}`,
                type: `audio/x-${fileType}`,
            });

            //FAZER TRATATIVA PARA CELULARES ANDROID.
            //FAZER TRATATIVA PARA CELULARES ANDROID.
            //FAZER TRATATIVA PARA CELULARES ANDROID.
            axios.post("https://bloco-b-backend.azurewebsites.net/api/upload-speech-audio?code=lCbYa/CFjxJhvjmAshzl1zWkI58WPBx8cblghX8voEppy2ddW8m2gA==",
                formData,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(response => {

                    let result = response.data;
                    console.log(result.Intent);

                    switch (result.Intent) {
                        case "reservation-intent":
                            this.setState({ modalText: "Entendi! Você gostaria de fazer uma reserva!" })
                            break;

                        case "visitante-intent":
                            this.setState({ modalText: "Entendi! Você gostaria de cadastrar um visitante!" })
                            break;

                        case "finances-intent":
                            this.setState({ modalText: "Entendi! Voce gostaria de ver suas contas!" })
                            break;

                        default:
                            this.setState({ modalText: "Não consegui entender sua solicitação" })
                            break;
                    }

                    this.setState({ modalNavigation: true })
                })
                .catch(error => {
                    this.setState({ modalNavigation: false })
                    console.log(error);
                });

        } catch (error) {

            console.log('There was an error reading file', error);
            this.stopRecording();
            this.resetRecording();
        }

        this.setState({ isFetching: false });
    }

    startRecording = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

        if (status !== 'granted')
            return;

        console.log('Gravando...');

        this.setState({ isRecording: true });

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
            staysActiveInBackground: false
        });

        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            //console.log(error);
            this.stopRecording();
        }

        this.recording = recording;
    }

    stopRecording = async () => {

        console.log('Concluido gravação...');

        this.setState({ isRecording: false });
        try {
            await this.recording.stopAndUnloadAsync();

        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
    }

    resetRecording = () => {
        this.deleteRecordingFile();
        this.recording = null;
    }

    handleOnPressIn = () => {
        this.startRecording();
    }

    handleOnPressOut = () => {
        this.stopRecording();
        this.getTranscription();
    }

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={style.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    _renderModalContent = () => (
        <View style={style.modalContent}>
            <Text>{this.state.modalText}</Text>
            {this._renderButton('Close', () => this.setState({ modalNavigation: false }))}
        </View>
    );

    render() {
        return (
            <View>
                <Modal isVisible={this.state.modalNavigation === true}>
                    {this._renderModalContent()}
                </Modal>
                <TouchableOpacity
                    style={style.bigBubble}
                    onPressIn={this.handleOnPressIn}
                    onPressOut={this.handleOnPressOut}>
                    <FAwesomeIcon
                        name="microphone"
                        size={40}
                        color="#FFF" />
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    bigBubble: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00BE68",
        height: 60,
        width: 90,
        borderRadius: 30,
        top: -10,
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

export default MicButton;