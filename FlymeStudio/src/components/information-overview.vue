<template>
<div class="layout">
  <Layout>

    <Header>
      <componentNavTop></componentNavTop>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <componentNavLeft activeName="1"></componentNavLeft>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">

          <Spin class="spin" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          <Alert>
            <div class="div-menu-item">
              <Icon class="icon-item" type="pound" size=25></Icon>
              <span class="span-item">{{ info.num }}</span>
            </div>
          </Alert>

          <Alert>
            <div class="div-menu-item">
              <Icon class="icon-item" type="person" size=25></Icon>
              <span class="span-item">{{ info.name }}</span>
            </div>
          </Alert>

          <Alert>
            <div class="div-menu-item">
              <Icon class="icon-item" type="ios-telephone" size=25></Icon>
              <span class="span-item">{{ info.tel }}</span>
            </div>
          </Alert>

          <Alert>
            <div class="div-menu-item">
              <Icon class="icon-item" type="email" size=25></Icon>
              <span class="span-item">{{ info.email }}</span>
            </div>
          </Alert>

          <!-- type: 1 = invite, 2 = apply -->
          <Alert class="alert-message" show-icon v-for="message in info.messages" :key="message.messageId">
            <Icon class="icon-item" type="ios-people" slot="icon" size=25></Icon>
            <Button class="btn-user" @click="clickUser(message.senderName, message.senderNum)">{{ message.sendName }}</Button>
            <span v-if="message.type == 1"> invited you to join </span>
            <span v-else-if="message.type == 2"> applied to join </span>
            <Button v-if="message.type == 1" class="btn-team" @click="clickTeam(message.teamName, message.teamId)">{{ message.teamName }}</Button>
            <Button v-else-if="message.type == 2" class="btn-apply" @click="clickTeam(message.teamName, message.teamId)">{{ message.teamName }}</Button>
            <template slot="desc">
              <div class="div-message">
                <Button class="btn-message" type="success" @click="reply(message.messageId, true)">Accept</Button>
                <Button class="btn-message" type="error" @click="reply(message.messageId, false)">Refuse</Button>
                <div v-if="message.type == 1" class="div-agreement" @click="modalAgreement = true"><i>Agreenment</i></div>
              </div>
            </template>
          </Alert>

          <!-- modal-user -->
          <Modal class="modal" v-model="modalUser" :closable="false" :mask-closable="false" title="User" ok-text="Ok" cancel-text="Cancel">
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="person" size=20></Icon>
                <span class="span-item">{{ user.sendName }}</span>
              </div>
            </Alert>
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="ios-telephone" size=20></Icon>
                <span class="span-item">{{ user.sendNum }}</span>
              </div>
            </Alert>
          </Modal>

          <!-- modal-team -->
          <Modal class="modal" v-model="modalTeam" :closable="false" :mask-closable="false" title="Team" ok-text="Ok" cancel-text="Cancel">
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="pound" size=20></Icon>
                <span class="span-item">{{ team.teamId }}</span>
              </div>
            </Alert>
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="ios-people" size=20></Icon>
                <span class="span-item">{{ team.teamName }}</span>
              </div>
            </Alert>
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="star" size=20></Icon>
                <span class="span-item">{{ team.administrator }}</span>
              </div>
            </Alert>
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="chatbubbles" size=20></Icon>
                <span class="span-item">{{ team.count }}</span>
              </div>
            </Alert>
          </Modal>

          <!-- modal-agreement -->
          <Modal class="modal" width="80%" v-model="modalAgreement" :closable="false" :mask-closable="false" title="Agreement" ok-text="Ok" cancel-text="Cancel">
            <Alert type="warning" style="color:red;">
              <template slot="desc">
                <ol>
                  <li class="li-agreement">
                    <span class="span-list">After joining a team, you will become the member of the team.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">As the member of the team, the team manager can view your all projects and summaries.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">Manager can export a report about your projects or summaries.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">Manager has right to remove you from the team.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">Administrator has right to disband the team.</span>
                  </li>
                </ol>
              </template>
            </Alert>
          </Modal>

        </Content>
      </Layout>
    </Layout>

    <componentFooter></componentFooter>

    <BackTop></BackTop>

  </Layout>
</div>
</template>

<script>
import componentNavTop from './component-nav-top.vue'
import componentNavLeft from './component-nav-left.vue'
import componentFooter from './component-footer.vue'
import teamworkApi from '../api/teamworkApi'
import imformationApi from '../api/informationApi'

export default{
  name: 'information-overview',
  created () {
    this.getInfo()
  },
  data () {
    return {
      info: {
        id: 0,
        num: '',
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      spinShow: false,
      user: {
        sendName: '',
        sendNum: ''
      },
      modalUser: false,
      team: {
        teamId: '',
        teamName: '',
        count: 0,
        administrator: ''
      },
      modalTeam: false,
      modalAgreement: false
    }
  },
  components: {
    componentNavTop,
    componentNavLeft,
    componentFooter
  },
  methods: {
    getInfo () {
      this.info = this.$store.state.user.userInfo
    },
    clickUser (sendName, sendNum) {
      this.user.sendName = sendName
      this.user.sendNum = sendNum
      this.modalUser = true
    },
    clickTeam (teamName, teamId) {
      this.spinShow = true
      this.team.teamName = teamName
      this.team.teamId = teamId
      let _this = this
      teamworkApi.getTeamInfo(teamId).then(function (response) {
        console.log('response=' + response)
        _this.spinShow = false
        if (response.status === 200) {
          if (response.data.result === true) {
            _this.team.count = response.data.data.count
            _this.team.administrator = response.data.data.administrator
            _this.modalTeam = true
          } else {
            _this.$Notice.error({
              title: 'Get team information failed.',
              desc: ''
            })
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
          console.log('status=' + response.status)
        }
      }).catch(function (error) {
        _this.$Notice.error({
          title: 'HTTP request error.',
          desc: ''
        })
        console.log(error)
      })
    },
    reply (messageId, result) {
      this.spinShow = true
      let _this = this
      imformationApi.reply(messageId, result).then(function (response) {
        console.log('response=' + response)
        if (response.status === 200) {
          if (response.data.result === true) {
            setTimeout(() => {
              _this.$store.dispatch('doDeleteMsg', messageId)
              _this.info = this.$store.state.user.userInfo
              _this.$Notice.success({
                title: 'Reply successful.',
                desc: ''
              })
            }, 1000)
          } else {
            setTimeout(() => {
              _this.$Notice.error({
                title: 'Reply failed.',
                desc: ''
              })
            }, 1000)
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
          console.log('status=' + response.status)
        }
        _this.spinShow = false
      }).catch(function (error) {
        _this.$Notice.error({
          title: 'HTTP request error.',
          desc: ''
        })
        _this.spinShow = false
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.div-menu-item {
  margin      : 2px auto;
  padding-left: 10px;
  color       : #2d8cf0;
}

.span-item {
  height     : 100%;
  align-items: center;
  margin     : auto auto auto 15px;
  font-size  : 16px;
}

.div-message {
  margin-top: 10px;
}

.btn-message {
  font-weight : bold;
  margin-right: 10px;
}

.modal {
  max-width: 200px;
  min-width: 100px;
  height   : auto;
}

.btn-user {
  font-weight     : bold;
  background-color: #80848f;
  color           : #fff;
}

.btn-team {
  font-weight     : bold;
  background-color: #2d8cf0;
  color           : #fff;
}

.btn-apply {
  font-weight     : bold;
  background-color: #ff9900;
  color           : #fff;
}

.div-agreement {
  width          : auto;
  font-size      : 16px;
  color          : #2d8cf0;
  cursor         : pointer;
  text-decoration: underline;
  display        : inline-block;
}

.li-agreement {
  color    : red;
  font-size: 18px;
  margin   : 20px;
}
</style>
