import {
  summaryApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  get (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: summaryApi.getUrl(),
      data: data,
      withCredentials: true
    })
  },
  create (tel, type, date, title, content) {
    var data = qs.stringify({
      tel: tel,
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
      data: data,
      withCredentials: true
    })
  },
  search (tel, type, date, title, content) {
    var data = qs.stringify({
      tel: tel,
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
      url: summaryApi.searchUrl(),
      data: data,
      withCredentials: true
    })
  },
  modify (tel, id, type, date, title, content) {
    var data = qs.stringify({
      tel: tel,
      id: id,
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
      data: data,
      withCredentials: true
    })
  },
  delete (tel, id) {
    var data = qs.stringify({
      tel: tel,
      id: id
    })
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: summaryApi.deleteUrl(),
      data: data,
      withCredentials: true
    })
  }
}
