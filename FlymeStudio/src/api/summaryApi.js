import {
  summaryApi,
  baseApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  get (user) {
    let url = summaryApi.getUrl() + '?user=' + user
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
  create (user, type, date, title, content) {
    var data = qs.stringify({
      user: user,
      type: type,
      date: date,
      title: title,
      content: content
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: summaryApi.createUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  modify (id, user, type, date, title, content) {
    var data = qs.stringify({
      id: id,
      user: user,
      type: type,
      date: date,
      title: title,
      content: content
    })
    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: summaryApi.modifyUrl(),
      baseURL: baseApi.baseUrl(),
      data: data,
      timeout: 5000,
      withCredentials: false
    })
  },
  delete (id, user) {
    let url = summaryApi.deleteUrl() + '?id=' + id + '&user=' + user
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
