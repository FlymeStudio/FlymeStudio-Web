import * as types from '../mutation-types'

const state = {
  active: false,
  domain: 'http://localhost:12102',
  userInfo: {
    id: 0,
    num: null,
    tel: null,
    name: null,
    email: null,
    password: null,
    messages: [
      {
        messageId: 0,
        type: 0,
        senderNum: '',
        senderName: '',
        teamId: 0,
        teamName: ''
      }
    ]
  }
}

const mutations = {
  [types.SIGNIN] (state, userInfo) {
    state.active = true
    state.userInfo = userInfo
  },
  [types.SIGNOUT] (state) {
    state.active = false
    state.userInfo = null
  },
  [types.UPDATE] (state, userInfo) {
    state.userInfo.tel = userInfo.tel
    state.userInfo.name = userInfo.name
    state.userInfo.email = userInfo.email
    state.userInfo.password = userInfo.password
  },
  [types.DELETEMSG] (state, messageId) {
    for (var i = 0; i < state.userInfo.messages.length; i++) {
      if (state.userInfo.messages[i].messageId === messageId) {
        state.userInfo.messages.splice(i, 1)
        break
      }
    }
  }
}

const actions = {
  doSignIn ({commit}, userInfo) {
    commit(types.SIGNIN, userInfo)
  },
  doSignOut ({commit}) {
    commit(types.SIGNOUT)
  },
  doUpdate ({commit}, userInfo) {
    commit(types.UPDATE, userInfo)
  },
  doDeleteMsg ({commit}, messageId) {
    commit(types.DELETEMSG, messageId)
  }
}

export default {
  state,
  mutations,
  actions
}
