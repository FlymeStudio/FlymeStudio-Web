import {
  projectApi,
  baseApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  get (user) {
    let url = projectApi.getUrl() + '?user=' + user
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
  create (user, type, date, title, content, plans) {
    var data = qs.stringify({
      user: user,
      type: type,
      date: date.getTime(),
      title: title,
      content: content,
      plans: JSON.stringify(plans)
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: projectApi.createUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  modify (id, user, type, date, title, content, plans) {
    var data = qs.stringify({
      id: id,
      user: user,
      type: type,
      date: date.getTime(),
      title: title,
      content: content,
      plans: JSON.stringify(plans)
    })
    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: projectApi.modifyUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  delete (id, user) {
    let url = projectApi.deleteUrl() + '?id=' + id + '&user=' + user
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
  }
}
