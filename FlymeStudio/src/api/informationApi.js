import {
  informationApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  modify (name, tel, email, password) {
    var data = qs.stringify({
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
      data: data,
      withCredentials: true
    })
  }
}
