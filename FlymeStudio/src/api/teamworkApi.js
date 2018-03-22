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
  reply (tel, messageId, result) {
    var data = qs.stringify({
      tel: tel,
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
  },
  view (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewUrl(),
      data: data,
      withCredentials: true
    })
  },
  viewUserProjects (tel, userTel) {
    var data = qs.stringify({
      tel: tel,
      userTel: userTel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewUserProjectsUrl(),
      data: data,
      withCredentials: true
    })
  },
  remove (tel, userTel, teamId) {
    var data = qs.stringify({
      tel: tel,
      userTel: userTel,
      teamId: teamId
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewUserProjectsUrl(),
      data: data,
      withCredentials: true
    })
  },
  search (tel, content) {
    var data = qs.stringify({
      tel: tel,
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
  create (tel, name) {
    var data = qs.stringify({
      tel: tel,
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
  }
}
