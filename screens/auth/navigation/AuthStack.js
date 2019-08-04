import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../LoginScreen';

const AuthStack = createStackNavigator(
    {
        LoginScreen
    },
    {
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default AuthStack;