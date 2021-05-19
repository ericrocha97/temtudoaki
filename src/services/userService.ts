//import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
//import Config from "../util/Config"

interface userCreate {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

class UserService {

  async create(data: userCreate) {
    return axios({
      url: "http://192.168.0.102:3000/user/create",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => {
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

}

const userService = new UserService()
export default userService