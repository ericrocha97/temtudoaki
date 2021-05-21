import React from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';



import mainStyles from '../styles/MainStyle';


export default function Register() {
  const navigation = useNavigation();

  function handleNavigateTo(screen: string) {
    navigation.navigate(screen)
  }

  return (
    <SafeAreaView style={mainStyles.container}>
      <StatusBar style="auto" />
      <Text h4>O que você quer cadastrar?</Text>
      <Button
        icon={
          <Icon
            name="shopping-bag"
            size={18}
            color="white"
          />
        }
        buttonStyle={[styles.buttonProducts, mainStyles.button]}
        titleStyle={mainStyles.textButton}
        title="Cadastrar Produto"
        onPress={() => { handleNavigateTo("ProductRegister") }}
      />
      <Button
        icon={
          <Icon
            name="emoji-people"
            size={18}
            color="white"
          />
        }
        buttonStyle={[styles.buttonServices, mainStyles.button]}
        titleStyle={mainStyles.textButton}
        title="Cadastrar Serviço"
        onPress={() => { handleNavigateTo("ServiceRegister") }}
      />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  buttonProducts: {
    backgroundColor: '#289b48'
  },
  buttonServices: {
    backgroundColor: '#197174'
  },
})