import React, { useRef, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { Button, Input, Text, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { TextInputMask, TextInputMaskMethods } from 'react-native-masked-text';


import mainStyles from '../styles/MainStyle';
import { TouchableWithoutFeedback } from 'react-native';


export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [CPF, setCPF] = useState('');
  const [phone, setPhone] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  //erros
  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorCPF, setErrorCPF] = useState('');
  const [errorPhone, setErrorPhone] = useState('');


  //cpf
  type InputMask = TextInputMask & TextInputMaskMethods
  const cpfField = useRef<InputMask>(null)
  const phoneField = useRef<InputMask>(null)

  function validate() {
    let error = false;
    setErrorEmail('')
    setErrorName('')
    setErrorCPF('')
    setErrorPhone('')

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
    if (!regexEmail.test(String(email).toLowerCase())) {
      setErrorEmail("Preencha seu e-mail corretamente");
      error = true;
    }

    if (name === '') {
      setErrorName("Preencha seu nome corretamente");
      error = true;
    }

    if (!cpfField.current?.isValid()) {
      setErrorCPF("Preencha seu CPF corretamente");
      error = true;
    }


    if (!phoneField.current?.isValid()) {
      setErrorPhone("Preencha seu telefone corretamente");
      error = true;
    }

    return !error;
  }


  function handleRegister() {
    if (validate()) {
      console.log("salvou")
      console.log({
        email,
        name,
        CPF,
        phone
      })
    }

  }

  return (
    <ScrollView style={[styles.container, { width: "100%" }]}>
      <KeyboardAvoidingView
        style={[mainStyles.container, styles.container]}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.title} h3>Cadastre-se no TemTudoAki</Text>
            <Input
              placeholder="Informe seu e-mail"
              keyboardType="email-address"
              onChangeText={value => {
                setEmail(value)
                setErrorEmail('')
              }}
              errorMessage={errorEmail}
            />
            <Input
              placeholder="Nome Completo"
              keyboardType="default"
              onChangeText={value => {
                setName(value)
                setErrorName('')
              }}
              errorMessage={errorName}
            />

            <View style={mainStyles.containerMask}>
              <TextInputMask
                placeholder="Informe seu CPF"
                value={CPF}
                type={'cpf'}
                keyboardType="number-pad"
                onChangeText={value => {
                  setCPF(value)
                  setErrorCPF('')
                }}
                style={mainStyles.maskedInput}
                placeholderTextColor="#86939e"
                returnKeyType="done"
                ref={cpfField}
              />

            </View>
            <Text style={mainStyles.errorMessage}>{errorCPF}</Text>

            <View style={mainStyles.containerMask}>
              <TextInputMask
                placeholder="Telefone"
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={phone}
                onChangeText={value => {
                  setPhone(value)
                  setErrorPhone('')
                }
                }
                keyboardType="phone-pad"
                returnKeyType="done"
                placeholderTextColor="#86939e"
                style={mainStyles.maskedInput}
                ref={phoneField}
              />
            </View>
            <Text style={mainStyles.errorMessage}>{errorPhone}</Text>
            <CheckBox
              title="Eu aceito os termos de uso"
              checkedIcon="check"
              uncheckedIcon="square-o"
              checkedColor="green"
              uncheckedColor="red"
              checked={isSelected}
              onPress={() => setIsSelected(!isSelected)}
              containerStyle={styles.button}
              textStyle={styles.text}
            />

            <Button
              icon={
                <Icon
                  name="user"
                  size={15}
                  color="white"
                />
              }
              title="Salvar"
              buttonStyle={styles.button}
              titleStyle={styles.text}
              onPress={() => handleRegister()}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 30
  },
  button: {
    width: '70%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})