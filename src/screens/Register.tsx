import React, { useState } from 'react'
import { View } from 'react-native';
import { Button, Input, Text, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { TextInputMask } from 'react-native-masked-text';


import mainStyles from '../styles/MainStyle';


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

    const regexCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

    if (!regexCPF.test(String(CPF).toLowerCase())) {
      setErrorCPF("Preencha seu CPF corretamente");
      error = true;
    }

    if (phone === '') {
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
    <View style={mainStyles.container}>
      <StatusBar style="auto" />
      <Text h3>Cadastre-se no TemTudoAki</Text>
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

        />
        <Text></Text>
      </View>
      <Input
        placeholder="Telefone"
        keyboardType="phone-pad"
        onChangeText={value => {
          setPhone(value)
          setErrorPhone('')
        }}
        returnKeyType="done"
        errorMessage={errorPhone}
      />
      <CheckBox
        title="Eu aceito os termos de uso"
        checkedIcon="check"
        uncheckedIcon="square-o"
        checkedColor="green"
        uncheckedColor="red"
        checked={isSelected}
        onPress={() => setIsSelected(!isSelected)}
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
        onPress={() => handleRegister()}
      />
    </View>
  )
}