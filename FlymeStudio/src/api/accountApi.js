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
      withCredentials: true
    })
  },
  signUp (num, name, tel, email, password) {
    var data = qs.stringify({
      num: num,
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
      url: accountApi.signUpUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
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
      withCredentials: true
    })
  },
  retrieve (num, name, tel, email) {
    var data = qs.stringify({
      num: num,
      name: name,
      tel: tel,
      email: email
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
      withCredentials: true
    })
  }
}
