import {
  loginApi,
  registerApi,
  retrieveApi,
  quitApi
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
  },
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
  },
  retrieve (name, tel, email) {
    var data = qs.stringify({
      name: name,
      tel: tel,
      email: email
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: retrieveApi.retrieveUrl(),
      data: data,
      withCredentials: true
    })
  },
  quit (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: quitApi.quitUrl(),
      data: data,
      withCredentials: true
    })
  }
}
