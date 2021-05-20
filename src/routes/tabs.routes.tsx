import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Home from '../screens/Home';

const AppTab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: '#1ac954',
        inactiveTintColor: '#116318',
        labelPosition: 'beside-icon',
        style: {
          height: 60,
          paddingBottom: Platform.OS === 'ios' ? 25 : 0,
        }
      }}
    >
      <AppTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <AppTab.Screen
        name="teste"
        component={Home}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />

    </AppTab.Navigator>
  )
}

export default AuthRoutes;