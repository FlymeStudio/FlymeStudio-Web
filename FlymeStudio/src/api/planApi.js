import {
  planApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  plan (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: planApi.planUrl(),
      data: data,
      withCredentials: true
    })
  },
  submit (type, date, title, content, plans) {
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
      url: planApi.submitUrl(),
      data: data,
      withCredentials: true
    })
  }
}
