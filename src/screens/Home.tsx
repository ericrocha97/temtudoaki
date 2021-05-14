import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';


import mainStyles from '../styles/MainStyle';


export default function Home() {
  return (
    <View style={mainStyles.container}>
      <StatusBar style="auto" />
      <Text h2>Home</Text>
    </View>
  )
}
