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
  modify (name, tel, email, newPassword, password) {
    var data = qs.stringify({
      name: name,
      tel: tel,
      email: email,
      newPassword: newPassword,
      password: password
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
  },
  team (teamId) {
    var data = qs.stringify({
      teamId: teamId
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.teamUrl(),
      data: data,
      withCredentials: true
    })
  },
  searchTeam (searchContent) {
    var data = qs.stringify({
      searchContent: searchContent
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.searchTeamUrl(),
      data: data,
      withCredentials: true
    })
  },
  joinTeam (tel, teamId) {
    var data = qs.stringify({
      tel: tel,
      teamId: teamId
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.joinTeamUrl(),
      data: data,
      withCredentials: true
    })
  },
  createTeam (teamName) {
    var data = qs.stringify({
      teamName: teamName
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: informationApi.createTeamUrl(),
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
      url: informationApi.replyUrl(),
      data: data,
      withCredentials: true
    })
  }
}
