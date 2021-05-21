import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from '../screens/Login';
import AuthRoutes from './tabs.routes';
import UserRegister from '../screens/UserRegister';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <SafeAreaProvider>
      <stackRoutes.Navigator
        headerMode="screen"
      >
        <stackRoutes.Screen
          name="Login"
          options={{
            headerShown: false
          }}
          component={Login}
        />
        <stackRoutes.Screen
          name="UserRegister"
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            title: "Cadastrar-se",
            headerStyle: {
              backgroundColor: '#eee',
              elevation: 1,
              shadowOpacity: 1,
            }
          }}
          component={UserRegister}
        />
        <stackRoutes.Screen
          name="AuthRoutes"
          options={{ headerShown: false }}
          component={AuthRoutes}
        />
      </stackRoutes.Navigator>
    </SafeAreaProvider>
  )
}

export default AppRoutes;