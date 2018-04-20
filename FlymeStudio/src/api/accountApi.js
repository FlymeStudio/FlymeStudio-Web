import {
  accountApi,
  baseApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  signIn (user, password) {
    var data = qs.stringify({
      user: user,
      password: password
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: accountApi.signInUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  signUp (num, name, tel, email, password) {
    var data = qs.stringify({
      num: num.trim(),
      name: name.trim(),
      tel: tel.trim(),
      email: email.trim(),
      password: password.trim()
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: accountApi.signUpUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  signOut (id) {
    var data = qs.stringify({
      id: id
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: accountApi.signOutUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  retrieve (num, tel, name, email) {
    var data = qs.stringify({
      num: num.trim(),
      tel: tel.trim(),
      name: name.trim(),
      email: email.trim()
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: accountApi.retrieveUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  }
}
