import {
  informationApi,
  baseApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  modify (old, name, tel, email, password) {
    var data = qs.stringify({
      old: old,
      name: name,
      tel: tel,
      email: email,
      password: password
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
      withCredentials: true
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
      withCredentials: true
    })
  }
}
