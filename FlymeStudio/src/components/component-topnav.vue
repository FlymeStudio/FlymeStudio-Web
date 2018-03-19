<template>
<div>
  <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">
    <div class="layout-logo" @click="clickFlyme"></div>
    <div class="layout-title" @click="clickTitle">Flyme Studio</div>
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
  <Spin style="z-index:10;" fix v-if="spinShow">
    <Icon class="icon-spin" type="load-c" size=50></Icon>
  </Spin>
</div>
</template>

<script>
import accountApi from '../api/accountApi'
import informationApi from '../api/informationApi'

export default {
  name: 'top-nav',
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
  methods: {
    getInfo () {
      this.info.name = '曾宇' // test
      this.info.email = '1213814232@qq.com' // test
      let _this = this
      informationApi.information(this.info.tel).then(function (response) {
        if (response.data.result === true) {
          _this.info = response.data.info
        }
      })
    },
    clickTopNav: function (name) {
      switch (name) {
        case '1':
          this.$router.push('/information/overview')
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
    clickTitle: function () {
      this.$router.push('/home')
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
    }
  }
}
</script>

<style scoped>
.menu {
  z-index: 5;
}

.span-item {
  font-size: 16px;
}
</style>
