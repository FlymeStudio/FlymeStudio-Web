import {
  projectApi,
  baseApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  get (user) {
    var data = qs.stringify({
      user: user
    })
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: projectApi.getUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  },
  create (user, type, date, title, content, plans) {
    var data = qs.stringify({
      user: user,
      type: type,
      date: date,
      title: title,
      content: content,
      plans: plans
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
      withCredentials: true
    })
  },
  modify (id, user, type, date, title, content, plans) {
    var data = qs.stringify({
      id: id,
      user: user,
      type: type,
      date: date,
      title: title,
      content: content,
      plans: plans
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
      withCredentials: true
    })
  },
  delete (id, user) {
    var data = qs.stringify({
      id: id,
      user: user
    })
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: projectApi.deleteUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: true
    })
  }
}
