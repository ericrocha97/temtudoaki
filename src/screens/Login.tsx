import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import mainStyles from '../styles/MainStyle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  function handleSignIn() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }]
    })

  }

  function handleSignUp() {
    navigation.navigate("Register")
  }

  return (
    <View style={mainStyles.container}>
      <StatusBar style="auto" />
      <Text h3>Entre no TemTudoAki</Text>
      <Input
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
      />
      <Input
        placeholder="Sua senha"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Button
        icon={
          <Icon
            name="check"
            size={15}
            color="white"
          />
        }
        buttonStyle={[styles.buttonSignIn, styles.button]}
        title="Entrar"
        onPress={() => handleSignIn()}
      />

      <Button
        icon={
          <Icon
            name="user"
            size={15}
            color="white"
          />
        }
        buttonStyle={[styles.buttonSignUp, styles.button]}
        title="Cadastrar"
        onPress={() => handleSignUp()}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: 10
  },
  buttonSignIn: {
    backgroundColor: '#289b48'
  },
  buttonSignUp: {
    backgroundColor: '#197174'
  }
})