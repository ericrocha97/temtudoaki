import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        leftIcon={{ type: 'material', size: 32, name: 'email', color: "#86939e" }}
        style={{ padding: 5 }}
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
      />
      <Input
        placeholder="Sua senha"
        leftIcon={{ type: 'material', size: 32, name: 'lock', color: "#86939e" }}
        style={{ padding: 5 }}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Button
        icon={
          <Icon
            name="check-circle"
            size={18}
            color="white"
          />
        }
        buttonStyle={[styles.buttonSignIn, styles.button]}
        titleStyle={styles.text}
        title="Entrar"
        onPress={() => handleSignIn()}
      />

      <Button
        icon={
          <Icon
            name="person"
            size={18}
            color="white"
          />
        }
        buttonStyle={[styles.buttonSignUp, styles.button]}
        titleStyle={styles.text}
        title="Cadastrar-se"
        onPress={() => handleSignUp()}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    width: '70%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonSignIn: {
    backgroundColor: '#289b48'
  },
  buttonSignUp: {
    backgroundColor: '#197174'
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})