// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

import Fire from '../../Fire';

type Props = {
    name?: string,
};

class ChatScreen extends React.Component<Props> {
    state = {
        messages: [],
    };

    get user() {
        return {
            name: "Morador",
            _id: Fire.shared.uid,
        };
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.send}
                user={this.user}
            />
        );
    }

    componentDidMount() {
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    componentWillUnmount() {
        Fire.shared.off();
    }
}

ChatScreen.navigationOptions = {
    title: 'Chat Interno',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
};

export default ChatScreen;
