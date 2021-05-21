import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native-paper';

import mainStyles from '../styles/MainStyle';
import CustomDialog from '../components/CustomDialog';
import serviceService from '../services/serviceService';


export default function ServiceRegister() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [errorTitle, setErrorTitle] = useState('')
  const [errorDescription, setErrorDescription] = useState('');

  //dialog
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  function clearFields() {
    setTitle('')
    setDescription('')
  }

  const showDialog = (title: string, message: string, type: string) => {
    setVisibleDialog(true)
    setTitleDialog(title)
    setMessage(message)
    setType(type)
  }

  const hideDialog = (status: boolean) => {
    setVisibleDialog(status)
    if (titleDialog === 'Sucesso') {
      clearFields()
    }
  }

  function validate() {
    let error = false;
    setErrorTitle('')
    setErrorDescription('')

    if (title.length < 5) {
      setErrorTitle("Digite pelo menos 5 caracteres")
      error = true
    }

    if (description.length < 20) {
      setErrorDescription("Digite pelo menos 20 caracteres")
      error = true
    }

    return !error;
  }

  function handleRegister() {
    if (validate()) {
      setLoading(true)

      const data = {
        title,
        description
      }

      serviceService.create(data)
        .then((response) => {
          setLoading(false)
          const dialogTitle = (response.data.status) ? "Sucesso" : "Erro"
          showDialog(dialogTitle, response.data.message, "SUCESSO")
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
          showDialog("Erro", "Houve um erro inesperado", "ERRO")
        })
    }

  }

  function handleCancel() {
    clearFields()
  }

  return (
    <SafeAreaView style={[{ height: "100%" }, styles.container]}>
      <ScrollView style={[{ width: "100%" }, styles.container]}>
        <KeyboardAvoidingView
          style={[mainStyles.container, styles.container]}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <StatusBar style="auto" />
              <Text style={styles.title} h3>Serviços</Text>
              <Input
                placeholder="Título do serviço"
                onChangeText={value => {
                  setTitle(value);
                  setErrorTitle('')
                }}
                value={title}
                errorMessage={errorTitle}
              />
              <Input
                placeholder="Descreva o serviço para explicar melhor"
                onChangeText={value => {
                  setDescription(value);
                  setErrorDescription('')
                }}
                value={description}
                errorMessage={errorDescription}
              />

              {isLoading ? (
                <ActivityIndicator />
              ) :
                (
                  <>
                    <Button
                      icon={
                        <Icon
                          name="check-circle"
                          size={18}
                          color="white"
                        />
                      }
                      title="Salvar"
                      buttonStyle={mainStyles.button}
                      titleStyle={mainStyles.textButton}
                      onPress={() => handleRegister()}
                    />

                    <Button
                      icon={
                        <Icon
                          name="cancel"
                          size={18}
                          color="white"
                        />
                      }
                      title="Cancelar"
                      buttonStyle={[mainStyles.button, mainStyles.cancelButton]}
                      titleStyle={mainStyles.textButton}
                      onPress={() => handleCancel()}
                    />
                  </>
                )

              }
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
      {visibleDialog &&
        <CustomDialog title={titleDialog} message={message} type={type} visible={visibleDialog} onClose={hideDialog} />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
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
})
