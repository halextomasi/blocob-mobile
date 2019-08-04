import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabBarIcon from '../../../components/TabBarIcon';
import MainScreen from '../MainScreen';

const BuildingStack = createStackNavigator(
    {
        Main: MainScreen
    },
);

BuildingStack.navigationOptions = {
    tabBarLabel: 'Prédio',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-business' : 'md-link'} />
    ),
};

export default BuildingStack;