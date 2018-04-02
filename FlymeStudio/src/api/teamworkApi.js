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
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.getTeamInfoUrl(),
      data: data,
      withCredentials: true
    })
  },
  replyMsg (tel, messageId, result) {
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
      url: teamworkApi.replyMsgUrl(),
      data: data,
      withCredentials: true
    })
  },
  viewTeams (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewTeamsUrl(),
      data: data,
      withCredentials: true
    })
  },
  searchUser (tel, content) {
    var data = qs.stringify({
      tel: tel,
      content: content
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.searchUserUrl(),
      data: data,
      withCredentials: true
    })
  },
  invite (tel, toTel, teamId) {
    var data = qs.stringify({
      tel: tel,
      toTel: toTel,
      teamId: teamId
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
  disband (tel, teamId) {
    var data = qs.stringify({
      tel: tel,
      teamId: teamId
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
  viewMemberProjects (tel, memberTel) {
    var data = qs.stringify({
      tel: tel,
      memberTel: memberTel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewMemberProjectsUrl(),
      data: data,
      withCredentials: true
    })
  },
  viewMemberSummaries (tel, memberTel) {
    var data = qs.stringify({
      tel: tel,
      memberTel: memberTel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewMemberSummariesUrl(),
      data: data,
      withCredentials: true
    })
  },
  setPermission (tel, memberTel, teamId, permission) {
    var data = qs.stringify({
      tel: tel,
      memberTel: memberTel,
      teamId: teamId,
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
  remove (tel, memberTel, teamId) {
    var data = qs.stringify({
      tel: tel,
      memberTel: memberTel,
      teamId: teamId
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
  searchTeam (tel, content) {
    var data = qs.stringify({
      tel: tel,
      content: content
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.searchTeamUrl(),
      data: data,
      withCredentials: true
    })
  },
  join (tel, teamId) {
    var data = qs.stringify({
      tel: tel,
      teamId: teamId
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
