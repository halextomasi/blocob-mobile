import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';
import BuldingServicesScreen from '../BuldingServicesScreen';
import ReservationScreen from '../ReservationScreen';
import ResidentsListScreen from '../ResidentsListScreen';
import ResidentInfoScreen from '../ResidentInfoScreen';
import VotationScreen from '../VotationScreen'

import { theme } from '../../../constants';


const BuildingStack = createStackNavigator(
    {
        MainScreen,
        BuldingServicesScreen,
        VotationScreen,
        ReservationScreen,
        ResidentsListScreen,
        ResidentInfoScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                height: theme.sizes.base * 4,
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

export default BuildingStack;