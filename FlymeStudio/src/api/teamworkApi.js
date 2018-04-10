import {
  teamworkApi
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
      data: data,
      withCredentials: true
    })
  },
  viewTeams (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewTeamsUrl(),
      data: data,
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
      data: data,
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
      data: data,
      withCredentials: true
    })
  },
  disband (id) {
    var data = qs.stringify({
      id: id
    })
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.disbandUrl(),
      data: data,
      withCredentials: true
    })
  },
  viewMemberProjects (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewMemberProjectsUrl(),
      data: data,
      withCredentials: true
    })
  },
  viewMemberSummaries (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewMemberSummariesUrl(),
      data: data,
      withCredentials: true
    })
  },
  setPermission (tel, id, permission) {
    var data = qs.stringify({
      tel: tel,
      id: id,
      permission: permission
    })
    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.setPermissionUrl(),
      data: data,
      withCredentials: true
    })
  },
  remove (tel, id) {
    var data = qs.stringify({
      tel: tel,
      id: id
    })
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.removeUrl(),
      data: data,
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
      data: data,
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
