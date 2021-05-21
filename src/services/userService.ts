import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import Config from '../util/config';
//import Config from "../util/Config"

interface userCreate {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

interface userLogin {
  username: string;
  password: string;
}

interface userLoginWithToken {
  token: string;
}

class UserService {

  async create(data: userCreate) {
    return axios({
      url: `${Config.API_URL}user/create`,
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST
    }).then((response) => {
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

  async login(data: userLogin) {
    return axios({
      url: `${Config.API_URL}user/login`,
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST
    }).then((response) => {
      AsyncStorage.setItem("@temtudoaki:token", response.data.access_token)
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
  async loginWithToken(data: userLoginWithToken) {
    return axios({
      url: `${Config.API_URL}user/login-token`,
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST
    }).then((response) => {
      AsyncStorage.setItem("@temtudoaki:token", response.data.access_token)
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

}

const userService = new UserService()
export default userService