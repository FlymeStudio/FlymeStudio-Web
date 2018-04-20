import {
  teamworkApi,
  baseApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  getTeamInfo (id) {
    let url = teamworkApi.getTeamInfoUrl() + '?id=' + id
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: url,
      baseURL: baseApi.baseUrl(),
      timeout: 5000,
      withCredentials: false
    })
  },
  viewTeams (user) {
    let url = teamworkApi.viewTeamsUrl() + '?user=' + user
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: url,
      baseURL: baseApi.baseUrl(),
      timeout: 5000,
      withCredentials: false
    })
  },
  searchUser (content) {
    let url = teamworkApi.searchUserUrl() + '?content=' + content.trim()
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: url,
      baseURL: baseApi.baseUrl(),
      timeout: 5000,
      withCredentials: false
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
      withCredentials: false
    })
  },
  disband (id, user) {
    let url = teamworkApi.disbandUrl() + '?id=' + id + '&user=' + user
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: url,
      baseURL: baseApi.baseUrl(),
      timeout: 5000,
      withCredentials: false
    })
  },
  viewMemberProjects (user) {
    let url = teamworkApi.viewMemberProjectsUrl() + '?user=' + user
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: url,
      baseURL: baseApi.baseUrl(),
      timeout: 5000,
      withCredentials: false
    })
  },
  viewMemberSummaries (user) {
    let url = teamworkApi.viewMemberSummariesUrl() + '?user=' + user
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: url,
      baseURL: baseApi.baseUrl(),
      timeout: 5000,
      withCredentials: false
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
      withCredentials: false
    })
  },
  remove (id, user) {
    let url = teamworkApi.removeUrl() + '?id=' + id + '&user=' + user
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: url,
      baseURL: baseApi.baseUrl(),
      timeout: 5000,
      withCredentials: false
    })
  },
  searchTeam (content) {
    let url = teamworkApi.searchTeamUrl() + '?content=' + content.trim()
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: url,
      baseURL: baseApi.baseUrl(),
      timeout: 5000,
      withCredentials: false
    })
  },
  join (sender, id) {
    var data = qs.stringify({
      sender: sender,
      id: id
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.joinUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  create (user, name) {
    var data = qs.stringify({
      user: user,
      name: name.trim()
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
      withCredentials: false
    })
  }
}
