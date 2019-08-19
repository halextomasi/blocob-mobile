// native
import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
            isRecording: false
        }
    }

    deleteRecordingFile = async () => {
        //console.log("Deleting file");
        try {
            const info = await FileSystem.getInfoAsync(this.recording.getURI());
            await FileSystem.deleteAsync(info.uri);
        } catch (error) {
            //console.log("There was an error deleting recording file", error);
        }
    }

    getTranscription = async () => {
        this.setState({ isFetching: true });

        try {
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

            let options = {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            };

            fetch("https://blocob-backend.azurewebsites.net/api/upload-speech-audio?code=2lnIpdgXlyczigLerzHdeDUFnhJf7/P1rzn9F96JIAk3mmuA73bovw==", options).then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })).then(res => {
                    console.log(res.status, res.data)
                }));

            //console.log(response);
            //console.log(data);
            //this.setState({ query: data.transcript });

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

        console.log(status);

        this.setState({ isRecording: true });

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
            staysActiveInBackground: false,
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

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={style.bigBubble}
                    onPressIn={this.handleOnPressIn}
                    onPressOut={this.handleOnPressOut}>
                    <FAwesomeIcon
                        name="microphone"
                        size={40}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    bigBubble: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(40, 155, 238)',
        height: 60,
        width: 90,
        borderRadius: 30,
        top: -10,
    },
});

export default MicButton;