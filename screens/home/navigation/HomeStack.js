import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';

const HomeStack = createStackNavigator(
    {
        Main: MainScreen,
    }
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home'
};

export default HomeStack;