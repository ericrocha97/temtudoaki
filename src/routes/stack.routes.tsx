import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Home from '../screens/Home';
import AuthRoutes from './tabs.routes';
import Register from '../screens/Register';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
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
        name="Register"
        options={{
          headerShown: true,
          title: "Cadastra-se",
          headerStyle: {
            backgroundColor: '#eee',
            elevation: 0,
          }
        }}
        component={Register}
      />
      <stackRoutes.Screen
        name="Home"
        options={{ headerShown: false }}
        component={AuthRoutes}
      />
    </stackRoutes.Navigator>
  )
}

export default AppRoutes;