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
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
    getInfo () {
      this.info.name = '曾宇' // test
      this.info.email = '1213814232@qq.com' // test
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
