import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';
import ChatScreen from '../ChatScreen';

const HomeStack = createStackNavigator(
    {
        MainScreen,
        ChatScreen
    }
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
};

export default HomeStack;