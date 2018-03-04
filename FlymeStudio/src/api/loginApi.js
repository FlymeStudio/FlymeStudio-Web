import {
  loginApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  login (id, password) {
    var data = qs.stringify({
      id: id,
      password: password
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: loginApi.loginUrl(),
      data: data,
      withCredentials: true
    })
  }
}
