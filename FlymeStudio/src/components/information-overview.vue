<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">
          <div class="layout-logo" @click="clickFlyme"></div>
          <div class="layout-title">Flyme Studio</div>
          <div class="layout-nav">
            <MenuItem name="1">
            <Icon class="item-icon" type="person" size=18></Icon>
            <span v-if="info.messages.length == 0" class="span-item">
              {{ info.name }}
            </span>
            <span v-else class="span-item">
              <Badge dot>{{ info.name }}</Badge>
            </span>
            </MenuItem>
            <MenuItem name="2">
            <Icon class="item-icon" type="help" size=18></Icon>
            <span class="span-item">Help</span>
            </MenuItem>
            <MenuItem name="3">
            <Icon class="item-icon" type="log-out" size=18></Icon>
            <span class="span-item">Sign out</span>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
          <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav" active-name="1" :open-names="['0', '10', '20']">
            <Submenu name="0">
              <template slot="title">
                <Icon type="person" size=18></Icon>
                  <span class="span-menu-item">Information</span>
              </template>
              <MenuItem name="1">Overview</MenuItem>
              <MenuItem name="2">Teamwork</MenuItem>
              <MenuItem name="3">Modify</MenuItem>
            </Submenu>
            <Submenu name="10">
              <template slot="title">
                <Icon type="clipboard" size=18></Icon>
                  <span class="span-menu-item">Project</span>
              </template>
              <MenuItem name="11">Overview</MenuItem>
              <MenuItem name="12">Create</MenuItem>
              <MenuItem name="13">Search</MenuItem>
            </Submenu>
            <Submenu name="20">
              <template slot="title">
                <Icon type="document-text" size=18></Icon>
                  <span class="span-menu-item">Summary</span>
              </template>
              <MenuItem name="21">Overview</MenuItem>
              <MenuItem name="22">Create</MenuItem>
              <MenuItem name="23">Search</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px'}">
          <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
            <Spin style="z-index:10;" fix v-if="spinShow">
              <Icon class="icon-spin" type="load-c" size=50></Icon>
            </Spin>

            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="person" slot="icon" size=30></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ info.name }}</span>
                </div>
              </template>
            </Alert>

            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="ios-telephone" slot="icon" size=30></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ info.tel }}</span>
                </div>
              </template>
            </Alert>

            <Alert class="alert-information" show-icon>
              <Icon class="icon-item" type="email" slot="icon" size=30></Icon>
              <template slot="desc">
                <div>
                  <span class="span-item">{{ info.email }}</span>
                </div>
              </template>
            </Alert>

            <Alert class="alert-information" show-icon v-for="item in info.messages" :key="item.messageId">
              <span class="span-item"><Tag color="#80848f">{{ item.from }}</Tag> invite you to join <Tag color="blue">{{ item.teamName }}</Tag></span>
              <Icon class="icon-item" type="ios-people" slot="icon" size=30></Icon>
              <template slot="desc">
                <div class="div-message">
                  <Button class="btn-message" type="success" @click="reply(item.messageId, true)">Accept</Button>
                  <Button class="btn-message" type="error" @click="reply(item.messageId, false)">Refuse</Button>
                </div>
              </template>
            </Alert>
          </Content>
        </Layout>
      </Layout>
      <componentFooter></componentFooter>
      <BackTop></BackTop>
    </Layout>
  </div>
</template>

<script type="text/javascript">
import componentFooter from './component-footer.vue'
import accountApi from '../api/accountApi'
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
            from: '13600000001',
            teamName: 'System support',
            teamId: '00001'
          },
          {
            messageId: '2',
            from: '13600000002',
            teamName: 'Overseas firmware',
            teamId: '00002'
          }
        ]
      },
      spinShow: false
    }
  },
  components: {
    componentFooter
  },
  methods: {
    getInfo () {
      this.info.name = '曾宇' // test
      this.info.email = '1213814232@qq.com' // test
    },
    clickTopNav: function (name) {
      switch (name) {
        case '1':
          this.componentId = '1'
          break
        case '2':
          this.clickHelp()
          break
        case '3':
          this.clickSignOut()
          break
        default:
      }
    },
    clickFlyme: function () {
      window.open('https://www.flyme.cn/')
    },
    clickHelp: function () {
      window.open('https://github.com/FlymeStudio/FlymeStudio-Doc/blob/master/introduce.md')
    },
    clickSignOut: function () {
      this.spinShow = true
      let _this = this
      setTimeout(() => {
        _this.spinShow = false
        _this.$Message.success('Sign out successful.')
        _this.$router.push('/signIn')
      }, 1000)
      accountApi.signOut(this.info.tel).then(function (response) {
        setTimeout(() => {
          _this.spinShow = false
          if (response.data.result === true) {
            _this.$Message.success('Sign out successful.')
            _this.$router.push('/signIn')
          } else {
            _this.$Message.error('Sign out failed.')
          }
        }, 1000)
      })
    },
    clickLeftNav: function (name) {
      switch (name) {
        case '1':
          this.$router.push('/information/overview')
          break
        case '2':
          this.$router.push('/information/teamwork')
          break
        case '3':
          this.$router.push('/information/modify')
          break
        case '11':
          this.$router.push('/project/overview')
          break
        case '12':
          this.$router.push('/project/create')
          break
        case '13':
          this.$router.push('/project/search')
          break
        case '21':
          this.$router.push('/summary/overview')
          break
        case '22':
          this.$router.push('/summary/create')
          break
        case '23':
          this.$router.push('/summary/search')
          break
        default:
          this.$router.push('/home')
      }
    },
    clickTeam (teamId) {

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
.menu {
  z-index: 5;
}

.span-menu-item{
  font-weight: bold;
  font-size: 16px;
}

.span-item {
  font-size: 16px;
}

.icon-item {
  width       : 18px;
  text-align  : center;
  margin-right: 10px;
}

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
  margin-right: 10px;
}
</style>
