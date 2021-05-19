import React, { useRef, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Alert } from 'react-native';
import { Button, Input, Text, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { TextInputMask, TextInputMaskMethods } from 'react-native-masked-text';


import mainStyles from '../styles/MainStyle';
import { TouchableWithoutFeedback } from 'react-native';
import userService from '../services/userService';
import CustomDialog from '../components/CustomDialog';


export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [CPF, setCPF] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setLoading] = useState(false)

  //erros
  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorCPF, setErrorCPF] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorPassword, setErrorPassword] = useState('');


  const [visibleDialog, setVisibleDialog] = useState(false);
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')


  //MaskInputs
  type InputMask = TextInputMask & TextInputMaskMethods
  const cpfField = useRef<InputMask>(null)
  const phoneField = useRef<InputMask>(null)

  const showDialog = (title: string, message: string, type: string) => {
    setVisibleDialog(true)
    setTitle(title)
    setMessage(message)
    setType(type)
  }

  const hideDialog = (status: boolean) => {
    setVisibleDialog(status)
  }

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

    if (password.length <= 7) {
      setErrorPassword("Preencha a senha com no mínimo 8 caracteres");
      error = true
    }

    return !error;
  }


  function handleRegister() {
    if (validate()) {
      setLoading(true)

      const data = {
        email: email,
        cpf: CPF,
        name: name,
        phone: phone,
        password: password
      }

      userService.create(data)
        .then((response) => {
          setLoading(false)
          const titulo = (response.data.status) ? "Sucesso" : "Erro"
          showDialog(titulo, response.data.mensagem, "SUCESSO")
          //Alert.alert(titulo, response.data.message)
        })
        .catch((error) => {
          setLoading(false)
          showDialog("Erro", "Houve um erro inesperado", "ERRO")
          //Alert.alert(error, error)
        })
    }
  }

  return (
    <View style={{ height: "100%" }}>
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

              <Input
                placeholder="Senha"
                onChangeText={value => {
                  setPassword(value)
                  setErrorPassword('')
                }}
                errorMessage={errorPassword}
                secureTextEntry={true}
              />

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

              {isLoading &&
                <Text>Carregando...</Text>
              }
              {!isLoading &&
                <Button
                  icon={
                    <Icon
                      name="check"
                      size={15}
                      color="white"
                    />
                  }
                  title="Salvar"
                  buttonStyle={styles.button}
                  titleStyle={styles.text}
                  onPress={() => handleRegister()}
                />
              }

            </View>

          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

      </ScrollView>
      {visibleDialog &&
        <CustomDialog title={title} message={message} type={type} visible={visibleDialog} onClose={hideDialog}></CustomDialog>
      }
    </View>
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