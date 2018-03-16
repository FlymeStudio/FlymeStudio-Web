import {
  informationApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  information (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.informationUrl(),
      data: data,
      withCredentials: true
    })
  },
  modify (name, tel, email, oldPassword, newPassword) {
    var data = qs.stringify({
      name: name,
      tel: tel,
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.modifyUrl(),
      data: data,
      withCredentials: true
    })
  }
}
