import {
  registerApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  register (name, tel, email, password) {
    var data = qs.stringify({
      name: name,
      tel: tel,
      email: email,
      password: password
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: registerApi.registerUrl(),
      data: data,
      withCredentials: true
    })
  }
}
