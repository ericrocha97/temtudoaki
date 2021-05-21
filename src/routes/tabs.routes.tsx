import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Products from '../screens/Products';
import Services from '../screens/Services';
import Register from '../screens/Register';

const AppTab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AppTab.Navigator
        tabBarOptions={{
          activeTintColor: '#e91e63',
          style: {
            paddingBottom: Platform.OS === 'ios' ? 35 : 10,
          }
        }}
        initialRouteName="Search"
      >
        <AppTab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="person-search"
                size={size}
                color={color}
              />
            ))
          }}
        />

        <AppTab.Screen
          name="Products"
          component={Products}
          options={{
            tabBarLabel: 'Produtos',
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="shopping-bag"
                size={size}
                color={color}
              />
            ))
          }}
        />

        <AppTab.Screen
          name="Services"
          component={Services}
          options={{
            tabBarLabel: 'Serviços',
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="emoji-people"
                size={size}
                color={color}
              />
            ))
          }}
        />

        <AppTab.Screen
          name="Register"
          component={Register}
          options={{
            tabBarLabel: 'Cadastrar',
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="add-circle"
                size={size}
                color={color}
              />
            ))
          }}
        />

        <AppTab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="account-circle"
                size={size}
                color={color}
              />
            ))
          }}
        />

      </AppTab.Navigator>
    </SafeAreaProvider>
  )
}

export default AuthRoutes;