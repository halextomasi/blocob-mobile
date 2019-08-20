import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';
import ReservationScreen from '../ReservationScreen';

import { theme, layout, mocks } from '../../../constants';


const BuildingStack = createStackNavigator(
    {
        MainScreen,
        ReservationScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                height: theme.sizes.base * 2,
                backgroundColor: theme.colors.white, // or 'white
                borderBottomColor: "transparent",
                elevation: 0, // for android
            },
            headerBackTitle: null,
            headerLeftContainerStyle: {
                alignItems: 'center',
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base,
            },
            headerRightContainerStyle: {
                alignItems: 'center',
                paddingRight: theme.sizes.base,
            },
        }
    }
);

BuildingStack.navigationOptions = {
    tabBarLabel: 'Prédio',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-business' : 'md-link'} />
    ),
};

export default BuildingStack;