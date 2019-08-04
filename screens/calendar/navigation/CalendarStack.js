import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';

const CalendarStack = createStackNavigator(
    {
        Main: MainScreen
    }
);

CalendarStack.navigationOptions = {
    tabBarLabel: 'Calendário'
};

export default CalendarStack;