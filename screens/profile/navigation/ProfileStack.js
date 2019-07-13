import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabBarIcon from '../../../components/TabBarIcon';
import MainScreen from '../MainScreen';

const ProfileStack = createStackNavigator(
    {
        Main: MainScreen,
    }
);

ProfileStack.navigationOptions = {
    tabBarLabel: 'Meu Apê',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-bed' : 'md-link'} />
    ),
};

export default ProfileStack;