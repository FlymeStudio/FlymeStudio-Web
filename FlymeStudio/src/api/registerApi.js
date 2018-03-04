import {
  registerApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  register (id, password) {
    var data = qs.stringify({
      id: id,
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
