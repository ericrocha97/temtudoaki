import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-elements';


import mainStyles from '../styles/MainStyle';


export default function ProductRegister() {
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: '#eee', }}>
      <ScrollView style={{ width: "100%", backgroundColor: '#eee' }}>
        <KeyboardAvoidingView
          style={[mainStyles.container, { backgroundColor: '#eee' }]}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={30}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <StatusBar style="auto" />
              <Text style={styles.title} h3>Cadastro Produto</Text>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: Dimensions.get('window').height * 0.3,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 30
  },
})
