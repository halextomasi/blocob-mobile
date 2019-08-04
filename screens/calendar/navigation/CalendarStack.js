import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabBarIcon from '../../../components/TabBarIcon';
import MainScreen from '../MainScreen';

const CalendarStack = createStackNavigator(
    {
        Main: MainScreen
    }
);

CalendarStack.navigationOptions = {
    tabBarLabel: 'Calendário',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
    ),
};

export default CalendarStack;