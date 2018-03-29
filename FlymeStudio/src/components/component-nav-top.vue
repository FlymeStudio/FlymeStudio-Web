<template>
<div>
  <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">

    <!-- left -->
    <div class="layout-logo" @click="clickFlyme"></div>
    <div class="layout-title" @click="clickTitle">Flyme Studio</div>

    <!-- right -->
    <div class="layout-nav">

      <MenuItem name="1">
        <div class="div-menu-item">
          <Icon class="icon-item" type="person" size=18></Icon>
          <span v-if="info.messages.length == 0" class="span-item">
          {{ info.name }}
          </span>
          <span v-else class="span-item">
            <Badge dot>{{ info.name }}</Badge>
          </span>
        </div>
      </MenuItem>

      <MenuItem name="2">
        <div class="div-menu-item">
          <Icon class="icon-item" type="help" size=18></Icon>
          <span class="span-item">Help</span>
        </div>
      </MenuItem>

      <MenuItem name="3">
        <div class="div-menu-item">
          <Icon class="icon-item" type="bug" size=18></Icon>
          <span class="span-item">Feedback</span>
        </div>
      </MenuItem>

      <MenuItem name="4">
        <div class="div-menu-item">
          <Icon class="icon-item" type="log-out" size=18></Icon>
          <span class="span-item">Sign out</span>
        </div>
      </MenuItem>

    </div>
  </Menu>

  <!-- spin -->
  <Spin class="spin" fix v-if="spinShow">
    <Icon class="icon-spin" type="load-c" size=50></Icon>
  </Spin>

</div>
</template>

<script>
import accountApi from '../api/accountApi'

export default {
  name: 'component-nav-top',
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
      spinShow: false
    }
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
    clickTopNav: function (name) {
      switch (name) {
        case '1':
          this.$router.push('/information/overview')
          break
        case '2':
          this.clickHelp()
          break
        case '3':
          this.clickFeedback()
          break
        case '4':
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
    clickFeedback: function () {
      window.open('https://github.com/FlymeStudio/FlymeStudio-Web/issues')
    },
    clickHelp: function () {
      window.open('https://github.com/FlymeStudio/FlymeStudio-Doc/blob/master/introduce.md')
    },
    clickSignOut: function () {
      this.spinShow = true
      let _this = this
      // TEST START
      setTimeout(() => {
        _this.spinShow = false
        _this.$Message.success('Sign out successful.')
        _this.$router.push('/signIn')
      }, 1000)
      // TEST END
      accountApi.signOut(this.info.tel).then(function (response) {
        _this.spinShow = false
        if (response.data.result === true) {
          _this.$store.dispatch('doSignOut')
          _this.$Message.success('Sign out successful.')
          setTimeout(() => {
            _this.$router.push('/signIn')
          }, 1000)
        } else {
          _this.$Message.error('Sign out failed.')
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

.span-item {
  margin     : auto;
  align-items: center;
  font-size  : 16px;
}
</style>
