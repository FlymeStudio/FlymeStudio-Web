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
        <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav">
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
            <MenuItem name="13">Modify</MenuItem>
          </Submenu>
          <Submenu name="20">
            <template slot="title">
              <Icon type="document-text" size=18></Icon>
                <span class="span-menu-item">Summary</span>
            </template>
            <MenuItem name="21">Overview</MenuItem>
            <MenuItem name="22">Create</MenuItem>
            <MenuItem name="23">Modify</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
          <Spin style="z-index:10;" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>
          <transition name="component-fade" mode="out-in">
            <Home v-show="componentId == 0"></Home>
          </transition>
          <transition name="component-fade" mode="out-in">
            <InformationOverview v-show="componentId == 1"></InformationOverview>
          </transition>
          <transition name="component-fade" mode="out-in">
            <InformationTeamwork v-show="componentId == 2"></InformationTeamwork>
          </transition>
          <transition name="component-fade" mode="out-in">
            <InformationModify v-show="componentId == 3"></InformationModify>
          </transition>
          <transition name="component-fade" mode="out-in">
            <ProjectOverview v-show="componentId == 11"></ProjectOverview>
          </transition>
          <transition name="component-fade" mode="out-in">
            <ProjectCreate v-show="componentId == 12"></ProjectCreate>
          </transition>
          <transition name="component-fade" mode="out-in">
            <ProjectModify v-show="componentId == 13"></ProjectModify>
          </transition>
          <transition name="component-fade" mode="out-in">
            <SummaryOverview v-show="componentId == 21"></SummaryOverview>
          </transition>
          <transition name="component-fade" mode="out-in">
            <SummaryCreate v-show="componentId == 22"></SummaryCreate>
          </transition>
          <transition name="component-fade" mode="out-in">
            <SummaryModify v-show="componentId == 23"></SummaryModify>
          </transition>
        </Content>
      </Layout>
    </Layout>
    <componentFooter></componentFooter>
    <BackTop></BackTop>
  </Layout>
</div>
</template>

<script>
import Home from './component-home.vue'
import InformationOverview from './information-overview.vue'
import InformationModify from './information-modify.vue'
import InformationTeamwork from './information-teamwork.vue'
import ProjectOverview from './project-overview.vue'
import ProjectCreate from './project-create.vue'
import ProjectModify from './project-modify.vue'
import SummaryOverview from './summary-overview.vue'
import SummaryCreate from './summary-create.vue'
import SummaryModify from './summary-modify.vue'
import componentFooter from './component-footer.vue'
import accountApi from '../api/accountApi'
import informationApi from '../api/informationApi'
import projectApi from '../api/projectApi'
import summaryApi from '../api/summaryApi'

export default {
  name: 'home',
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
      tagId: 0,
      componentId: 0,
      spinShow: false
    }
  },
  components: {
    Home,
    InformationOverview,
    InformationModify,
    InformationTeamwork,
    ProjectOverview,
    ProjectCreate,
    ProjectModify,
    SummaryOverview,
    SummaryCreate,
    SummaryModify,
    componentFooter
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
      projectApi.project(this.info.tel).then(function (response) {
        if (response.data.result === true) {
          // save in store
        }
      })
      summaryApi.summary(this.info.tel).then(function (response) {
        if (response.data.result === true) {
          // save in store
        }
      })
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
      this.componentId = name
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-180px);
  opacity  : 0;
}

.component-fade-enter-active {
  transition: 0.5s ease;
}

.component-fade-leave-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.component-fade-enter {
  opacity  : 0;
  transform: translateY(300px);
}

.component-fade-leave-to {
  transform: translateY(-300px);
  opacity  : 0;
}

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

</style>
