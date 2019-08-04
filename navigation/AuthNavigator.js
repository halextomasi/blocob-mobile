import { createStackNavigator } from 'react-navigation';

import AuthStack from '../screens/auth/navigation/AuthStack';

const RouteConfig = {
    Auth: {
        screen: AuthStack
    },
};

export default createStackNavigator(
    RouteConfig,
    {
        defaultNavigationOptions: {
            header: null
        }
    });