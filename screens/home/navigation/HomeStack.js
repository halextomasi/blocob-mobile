import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';
//import ReservationScreen from '../ReservationScreen';


const HomeStack = createStackNavigator(
    {
        MainScreen
    }
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
};

export default HomeStack;