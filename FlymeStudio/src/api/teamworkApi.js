import {
  teamworkApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  getTeamMsg (id) {
    var data = qs.stringify({
      id: id
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.getTeamMsgUrl(),
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
  viewTeamProjects (tel, teamId) {
    var data = qs.stringify({
      tel: tel,
      teamId: teamId
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewTeamProjectsUrl(),
      data: data,
      withCredentials: true
    })
  },
  viewTeamSummaries (tel, teamId) {
    var data = qs.stringify({
      tel: tel,
      teamId: teamId
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.viewTeamSummariesUrl(),
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
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.disbandUrl(),
      data: data,
      withCredentials: true
    })
  },
  viewMemberProjects (tel, userTel) {
    var data = qs.stringify({
      tel: tel,
      userTel: userTel
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
  viewMemberSummaries (tel, userTel) {
    var data = qs.stringify({
      tel: tel,
      userTel: userTel
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
  setPermission (tel, userTel, teamId, permission) {
    var data = qs.stringify({
      tel: tel,
      userTel: userTel,
      teamId: teamId,
      permission: permission
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: teamworkApi.setPermissionUrl(),
      data: data,
      withCredentials: true
    })
  },
  removeMember (tel, userTel, teamId) {
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
      url: teamworkApi.removeMemberUrl(),
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
      url: teamworkApi.joinTeamUrl(),
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
