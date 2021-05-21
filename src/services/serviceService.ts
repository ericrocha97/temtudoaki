import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import Config from '../util/config';

interface userCreate {
  title: string;
  description: string;
}


class ServiceService {

  async create(data: userCreate) {
    const token = await AsyncStorage.getItem("@temtudoaki:token")
    return axios({
      url: `${Config.API_URL}service/create`,
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }


}

const serviceService = new ServiceService()
export default serviceService