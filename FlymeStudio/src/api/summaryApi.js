import {
  summaryApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  summary (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: summaryApi.summaryUrl(),
      data: data,
      withCredentials: true
    })
  }
}
