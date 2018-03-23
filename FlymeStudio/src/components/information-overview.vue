<template>
<div class="layout">
  <Layout>

    <Header>
      <topNav></topNav>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="1"></leftNav>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">

          <Spin class="spin" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

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

          <Alert class="alert-message" show-icon v-for="item in info.messages" :key="item.messageId">
            <Icon class="icon-item" type="ios-people" slot="icon" size=25></Icon>
            <Button class="btn-user" @click="clickUser(item.fromName, item.fromTel)">{{ item.fromName }}</Button>
            <span v-if="item.type == 1"> invited you to join </span><span v-else-if="item.type == 2"> applied to join </span>
            <Button v-if="item.type == 1" class="btn-invite" @click="clickTeam(item.teamName, item.teamId)">{{ item.teamName }}</Button>
            <Button v-else-if="item.type == 2" class="btn-apply" @click="clickTeam(item.teamName, item.teamId)">{{ item.teamName }}</Button>
            <template slot="desc">
              <div class="div-message">
                <Button class="btn-message" type="success" @click="reply(item.messageId, true)">Accept</Button>
                <Button class="btn-message" type="error" @click="reply(item.messageId, false)">Refuse</Button>
              </div>
            </template>
          </Alert>

          <!-- modal-user -->
          <Modal class="modal" v-model="modalUser" :closable="false" :mask-closable="false" title="User" ok-text="Ok" cancel-text="Cancel">
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="person" size=20></Icon>
                <span class="span-item">{{ user.fromName }}</span>
              </div>
            </Alert>
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="ios-telephone" size=20></Icon>
                <span class="span-item">{{ user.fromTel }}</span>
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
                <span class="span-item">{{ team.manager }}</span>
              </div>
            </Alert>
            <Alert>
              <div class="div-menu-item">
                <Icon class="icon-item" type="chatbubbles" size=20></Icon>
                <span class="span-item">{{ team.count }}</span>
              </div>
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
import topNav from './component-nav-top.vue'
import leftNav from './component-nav-left.vue'
import componentFooter from './component-footer.vue'
import teamworkApi from '../api/teamworkApi'

export default{
  name: 'information-overview',
  created () {
    this.getInfo()
  },
  data () {
    return {
      info: {
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      spinShow: false,
      modalUser: false,
      checkable: false,
      user: {
        fromName: '',
        fromTel: ''
      },
      team: {
        teamId: '',
        teamName: '',
        count: 0,
        manager: ''
      },
      modalTeam: false
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
    getInfo () {
      let name = this.$store.state.user.userInfo.name
      if (name === null) {
        this.$router.push('/')
      } else {
        this.info = this.$store.state.user.userInfo
      }
    },
    clickUser (fromName, fromTel) {
      this.user.fromName = fromName
      this.user.fromTel = fromTel
      this.modalUser = true
    },
    clickTeam (teamName, teamId) {
      this.spinShow = true
      this.team.teamName = teamName
      this.team.teamId = teamId
      let _this = this
      // TEST START
      setTimeout(() => {
        _this.team.count = 1
        if (teamId === '00001') {
          _this.team.manager = '李永达'
        } else if (teamId === '00002') {
          _this.team.manager = '段启智'
        }
        _this.spinShow = false
        _this.modalTeam = true
      }, 1000)
      // TEST END
      teamworkApi.team(teamId).then(function (response) {
        _this.spinShow = false
        if (response.data.result === true) {
          _this.team.count = response.data.count
          _this.team.manager = response.data.manager
          _this.modalTeam = true
        } else {
          _this.$Notice.error({
            title: 'Get team information failed.',
            desc: ''
          })
        }
      })
    },
    reply (messageId, result) {
      this.spinShow = true
      let _this = this
      // TEST START
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Reply successful.',
          desc: ''
        })
        _this.$store.dispatch('doDeleteMsg', messageId)
        _this.spinShow = false
      }, 1000)
      // TEST END
      teamworkApi.reply(this.info.tel, messageId, result).then(function (response) {
        if (response.data.result === true) {
          setTimeout(() => {
            _this.$store.dispatch('doDeleteMsg', messageId)
            _this.info = this.$store.state.user.userInfo
            _this.$Notice.success({
              title: 'Reply successful.',
              desc: ''
            })
            _this.spinShow = false
          }, 1000)
        } else {
          setTimeout(() => {
            _this.$Notice.error({
              title: 'Reply failed.',
              desc: ''
            })
            _this.spinShow = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped>
.div-menu-item {
  margin      : 2px auto;
  padding-left: 10px;
  color       : #2b85e4;
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

.btn-invite {
  font-weight     : bold;
  background-color: #2d8cf0;
  color           : #fff;
}

.btn-apply {
  font-weight     : bold;
  background-color: #ff9900;
  color           : #fff;
}
</style>
