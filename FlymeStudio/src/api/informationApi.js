import {
  informationApi
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
      data: data,
      withCredentials: true
    })
  },
  replyMsg (id, result) {
    var data = qs.stringify({
      id: id,
      result: result
    })
    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.replyMsgUrl(),
      data: data,
      withCredentials: true
    })
  }
}
