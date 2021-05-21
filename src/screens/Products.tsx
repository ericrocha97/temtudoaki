import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';


import mainStyles from '../styles/MainStyle';


export default function Products() {
  return (
    <SafeAreaView style={mainStyles.container}>
      <StatusBar style="auto" />
      <Text h3>Tela de produtos</Text>
    </SafeAreaView>
  )
}
