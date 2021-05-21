import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "./config";

export default function defineInterceptor() {
  axios.interceptors.response.use(response => {
    return response;
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if (err.response.status == 401 && err.config && !err.config._retry) {
        originalReq._retry = true
        AsyncStorage.getItem("@temtudoaki:token").then((token) => {
          const res = axios.put(`${Config.API_URL}token/refresh`, { oldToken: token })
            .then((res) => {
              AsyncStorage.setItem("@temtudoaki:token", res.data.access_token)
              originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
              return axios(originalReq);
            })
          resolve(res)
        })
      } else {
        reject(err)
      }
    })
  })
}
