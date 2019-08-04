import { createStackNavigator } from 'react-navigation';

import MainScreen from '../MainScreen';

const BuildingStack = createStackNavigator(
    {
        Main: MainScreen
    },
);

BuildingStack.navigationOptions = {
    tabBarLabel: 'Prédio'
};

export default BuildingStack;