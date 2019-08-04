import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';

const ProfileStack = createStackNavigator(
    {
        Main: MainScreen,
    }
);

ProfileStack.navigationOptions = {
    tabBarLabel: 'Meu Apê',
};

export default ProfileStack;