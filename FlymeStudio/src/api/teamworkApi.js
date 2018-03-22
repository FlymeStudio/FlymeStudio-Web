import {
  teamworkApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  team (id) {
    var data = qs.stringify({
      id: id
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.teamUrl(),
      data: data,
      withCredentials: true
    })
  },
  search (content) {
    var data = qs.stringify({
      content: content
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.searchUrl(),
      data: data,
      withCredentials: true
    })
  },
  join (tel, id) {
    var data = qs.stringify({
      tel: tel,
      id: id
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.joinUrl(),
      data: data,
      withCredentials: true
    })
  },
  create (password, name) {
    // check password
    var data = qs.stringify({
      name: name
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.createUrl(),
      data: data,
      withCredentials: true
    })
  },
  reply (messageId, result) {
    var data = qs.stringify({
      messageId: messageId,
      result: result
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.replyUrl(),
      data: data,
      withCredentials: true
    })
  }
}
