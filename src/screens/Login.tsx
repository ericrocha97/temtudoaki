import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

import mainStyles from '../styles/MainStyle';
import userService from '../services/userService';
import CustomDialog from '../components/CustomDialog';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false)

  const navigation = useNavigation();

  //dialog
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  const showDialog = (title: string, message: string, type: string) => {
    setVisibleDialog(true)
    setTitle(title)
    setMessage(message)
    setType(type)
  }

  const hideDialog = (status: boolean) => {
    setVisibleDialog(status)
  }

  function handleSignIn() {
    setLoading(true)
    const data = {
      username: email,
      password: password
    }

    userService.login(data)
      .then((response) => {
        setLoading(false)
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }]
        })
      })
      .catch((error) => {
        setLoading(false)
        showDialog("Erro", "Usuário ou senha incorretos.", "ERRO")
      })



  }

  function handleSignUp() {
    navigation.navigate("Register")
  }

  return (
    <View style={{ height: "100%", backgroundColor: '#eee', }}>
      <ScrollView style={{ width: "100%" }}>
        <KeyboardAvoidingView
          style={mainStyles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={30}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
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
              {
                isLoading ? (
                  <ActivityIndicator />
                ) : (
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
                )
              }


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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

      </ScrollView>
      {visibleDialog &&
        <CustomDialog title={title} message={message} type={type} visible={visibleDialog} onClose={hideDialog} />
      }
    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    marginTop: Dimensions.get('window').height * 0.3,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: Dimensions.get('window').width * 0.7,
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