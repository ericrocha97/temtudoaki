import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import mainStyles from '../styles/MainStyle';

export default function Profile() {

  const navigation = useNavigation();

  const logout = () => {
    AsyncStorage.removeItem("@temtudoaki:token").then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      })
    }).catch((error) => {
      console.log(error)
      Alert.alert("Erro ao sair")
    })
  }

  return (
    <SafeAreaView style={mainStyles.container}>
      <Text h4>Profile!</Text>
      <Button
        icon={
          <Icon
            name="logout"
            size={15}
            color="white"
          />
        }
        title="Sair"
        buttonStyle={mainStyles.button}
        titleStyle={mainStyles.textButton}
        onPress={() => logout()}
      />
    </SafeAreaView>
  );
}