import {
  teamworkApi,
  baseApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  getTeamInfo (id) {
    var data = qs.stringify({
      id: id
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.getTeamInfoUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  viewTeams (user) {
    var data = qs.stringify({
      user: user
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewTeamsUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  searchUser (content) {
    var data = qs.stringify({
      content: content
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.searchUserUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  invite (sender, receiver, id) {
    var data = qs.stringify({
      sender: sender,
      receiver: receiver,
      id: id
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.inviteUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  disband (id, user) {
    var data = qs.stringify({
      id: id,
      user: user
    })
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.disbandUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  viewMemberProjects (user) {
    var data = qs.stringify({
      user: user
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewMemberProjectsUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  viewMemberSummaries (user) {
    var data = qs.stringify({
      user: user
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewMemberSummariesUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  setPermission (id, user, permission) {
    var data = qs.stringify({
      id: id,
      user: user,
      permission: permission
    })
    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.setPermissionUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  remove (id, user) {
    var data = qs.stringify({
      id: id,
      user: user
    })
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.removeUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  searchTeam (content) {
    var data = qs.stringify({
      content: content
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.searchTeamUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  join (sender, id) {
    var data = qs.stringify({
      sender: sender,
      id: id
    })
    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.joinUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  create (user, name) {
    var data = qs.stringify({
      user: user,
      name: name
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.createUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  }
}
