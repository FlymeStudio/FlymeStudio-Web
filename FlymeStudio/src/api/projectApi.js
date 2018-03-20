import {
  projectApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  project (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: projectApi.projectUrl(),
      data: data,
      withCredentials: true
    })
  },
  create (type, date, title, content, plans) {
    var data = qs.stringify({
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
      data: data,
      withCredentials: true
    })
  },
  search (type, date, title, content, plans) {
    var data = qs.stringify({
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
      url: projectApi.searchUrl(),
      data: data,
      withCredentials: true
    })
  },
  modify (timestamp, type, date, title, content, plans) {
    var data = qs.stringify({
      timestamp: timestamp,
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
      url: projectApi.modifyUrl(),
      data: data,
      withCredentials: true
    })
  }
}
