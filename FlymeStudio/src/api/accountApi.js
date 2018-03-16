import {
  accountApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  signIn (id, password) {
    var data = qs.stringify({
      id: id,
      password: password
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: accountApi.signInUrl(),
      data: data,
      withCredentials: true
    })
  },
  signUp (name, tel, email, password) {
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
      url: accountApi.signUpUrl(),
      data: data,
      withCredentials: true
    })
  },
  signOut (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: accountApi.signOutUrl(),
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
      url: accountApi.retrieveUrl(),
      data: data,
      withCredentials: true
    })
  }
}
