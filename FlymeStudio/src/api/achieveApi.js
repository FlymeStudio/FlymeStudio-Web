import {
  achieveApi
} from './urlApi'
import axios from 'axios'
import qs from 'qs'

export default {
  achieve (tel) {
    var data = qs.stringify({
      tel: tel
    })
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      url: achieveApi.achieveUrl(),
      data: data,
      withCredentials: true
    })
  }
}
