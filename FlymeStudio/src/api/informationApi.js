import {
  informationApi,
  baseApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  modify (id, name, tel, email, password) {
    var data = qs.stringify({
      id: id,
      name: name.trim(),
      tel: tel.trim(),
      email: email.trim(),
      password: password.trim()
    })
    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.modifyUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  reply (id, result) {
    var data = qs.stringify({
      id: id,
      result: result
    })
    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.replyUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  }
}
