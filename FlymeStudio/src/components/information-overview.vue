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

          <Alert class="alert-information" show-icon>
            <Icon class="icon-item" type="person" slot="icon" size=25></Icon>
            <template slot="desc">
              <div>
                <span class="span-item">{{ info.name }}</span>
              </div>
            </template>
          </Alert>

          <Alert class="alert-information" show-icon>
            <Icon class="icon-item" type="ios-telephone" slot="icon" size=25></Icon>
            <template slot="desc">
              <div>
                <span class="span-item">{{ info.tel }}</span>
              </div>
            </template>
          </Alert>

          <Alert class="alert-information" show-icon>
            <Icon class="icon-item" type="email" slot="icon" size=25></Icon>
            <template slot="desc">
              <div>
                <span class="span-item">{{ info.email }}</span>
              </div>
            </template>
          </Alert>

          <Alert class="alert-information" show-icon v-for="item in info.messages" :key="item.messageId">
            <Button class="btn-user" @click="clickUser(item.fromName, item.fromTel)">{{ item.fromName }}</Button>
            <span v-if="item.type == 1"> invited you to join </span><span v-else-if="item.type == 2"> applied to join </span>
            <Button v-if="item.type == 1" class="btn-invite" @click="clickTeam(item.teamName, item.teamId)">{{ item.teamName }}</Button>
            <Button v-else-if="item.type == 2" class="btn-apply" @click="clickTeam(item.teamName, item.teamId)">{{ item.teamName }}</Button>
            <Icon class="icon-item" type="ios-people" slot="icon" size=25></Icon>
            <template slot="desc">
              <div class="div-message">
                <Button class="btn-message" type="success" @click="reply(item.messageId, true)">Accept</Button>
                <Button class="btn-message" type="error" @click="reply(item.messageId, false)">Refuse</Button>
              </div>
            </template>
          </Alert>

          <!-- user -->
          <Modal class="modal-user" v-model="modalUser" :closable="false" :mask-closable="false" title="User" ok-text="Ok" cancel-text="Cancel">
            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="person" slot="icon" size=25></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ user.fromName }}</span>
                </div>
              </template>
            </Alert>
            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="ios-telephone" slot="icon" size=25></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ user.fromTel }}</span>
                </div>
              </template>
            </Alert>
          </Modal>

          <!-- team -->
          <Modal class="modalTeam" v-model="modalTeam" :closable="false" :mask-closable="false" title="Team" ok-text="Ok" cancel-text="Cancel">
            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="pound" slot="icon" size=25></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ team.teamId }}</span>
                </div>
              </template>
            </Alert>
            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="ios-people" slot="icon" size=25></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ team.teamName }}</span>
                </div>
              </template>
            </Alert>
            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="star" slot="icon" size=25></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ team.manager }}</span>
                </div>
              </template>
            </Alert>
            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="chatbubbles" slot="icon" size=25></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ team.count }}</span>
                </div>
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

<script type="text/javascript">
import topNav from './component-topnav.vue'
import leftNav from './component-leftnav.vue'
import componentFooter from './component-footer.vue'
import informationApi from '../api/informationApi'

export default{
  name: 'information-overview',
  created () {
    this.getInfo()
  },
  data () {
    return {
      info: {
        tel: '13608089849',
        name: 'user',
        email: '',
        messages: [
          {
            messageId: '1',
            type: 1,
            fromTel: '13600000001',
            fromName: '刘卓旻',
            teamName: 'System support',
            teamId: '00001'
          },
          {
            messageId: '2',
            type: 2,
            fromTel: '13600000002',
            fromName: '余学海',
            teamName: 'Overseas firmware',
            teamId: '00002'
          }
        ]
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
      this.info.name = '曾宇' // test
      this.info.email = '1213814232@qq.com' // test
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
      informationApi.team(teamId).then(function (response) {
        if (response.data.result === true) {
          _this.team.count = response.data.count
          _this.team.manager = response.data.manager
          _this.modalTeam = true
        } else {
          _this.$Notice.error({
            title: 'Get team information failed.',
            desc: ''
          })
          _this.spinShow = false
        }
      })
    },
    reply (messageId, result) {
      this.spinShow = true
      let _this = this
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Reply successful.',
          desc: ''
        })
        for (var i = 0; i < _this.info.messages.length; i++) {
          if (_this.info.messages[i].messageId === messageId) {
            _this.info.messages.splice(i, 1)
            break
          }
        }
        _this.spinShow = false
      }, 1000)
      informationApi.reply(messageId, result).then(function (response) {
        if (response.data.result === true) {
          setTimeout(() => {
            _this.$Notice.success({
              title: 'Reply successful.',
              desc: ''
            })
            for (var i = 0; i < _this.info.messages.length; i++) {
              if (_this.info.messages[i].messageId === messageId) {
                _this.info.messages.splice(i, 1)
                break
              }
            }
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
.span-item {
  font-size: 16px;
}

.alert-information {
  margin-bottom: 10px;
}

.div-message {
  margin-top: 10px;
}

.btn-message {
  font-weight : bold;
  margin-right: 10px;
}

.modal-user {
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
