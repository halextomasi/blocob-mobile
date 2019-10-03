import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';
import ChatScreen from '../ChatScreen';
import ResidentsListScreen from '../../building/ResidentsListScreen';


const HomeStack = createStackNavigator(
    {
        MainScreen,
        ChatScreen,
        ResidentsListScreen
    }
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
};

export default HomeStack;