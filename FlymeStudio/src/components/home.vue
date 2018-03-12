<template>
<div class="layout">
  <Layout>
    <Header>
      <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">
        <div class="layout-logo" @click="clickFlyme"></div>
        <div class="layout-nav">
          <MenuItem name="0-1">
          <Icon type="person"></Icon>
          {{ name }}
          </MenuItem>
          <MenuItem name="0-2">
          <Icon type="help"></Icon>
          Help
          </MenuItem>
          <MenuItem name="0-3">
          <Icon type="log-out"></Icon>
          Sign Out
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav">
          <Submenu name="0">
            <template slot="title">
              <Icon type="person"></Icon>
                Info
            </template>
            <MenuItem name="1">View</MenuItem>
            <MenuItem name="2">Modify</MenuItem>
          </Submenu>
          <Submenu name="10">
            <template slot="title">
              <Icon type="clipboard"></Icon>
                Plan
            </template>
            <MenuItem name="11">Overview</MenuItem>
            <MenuItem name="12">Write</MenuItem>
            <MenuItem name="13">Search</MenuItem>
          </Submenu>
          <Submenu name="20">
            <template slot="title">
              <Icon type="document-text"></Icon>
                Achieve
            </template>
            <MenuItem name="21">Overview</MenuItem>
            <MenuItem name="22">Write</MenuItem>
            <MenuItem name="23">Search</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 24px 24px'}">
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
          <transition name="component-fade" mode="out-in">
          <componentInfoView v-show="componentId == 1"></componentInfoView>
          </transition>
            <transition name="component-fade" mode="out-in">
            <componentInfoModify v-show="componentId == 2"></componentInfoModify>
            </transition>
            <transition name="component-fade" mode="out-in">
          <componentPlanOverview v-show="componentId == 11"></componentPlanOverview>
          </transition>
            <transition name="component-fade" mode="out-in">
          <componentPlanWrite v-show="componentId == 12"></componentPlanWrite>
          </transition>
            <transition name="component-fade" mode="out-in">
          <componentPlanSearch v-show="componentId == 13"></componentPlanSearch>
          </transition>
            <transition name="component-fade" mode="out-in">
          <componentAchieveOverview v-show="componentId == 21"></componentAchieveOverview>
          </transition>
            <transition name="component-fade" mode="out-in">
          <componentAchieveWrite v-show="componentId == 22"></componentAchieveWrite>
          </transition>
            <transition name="component-fade" mode="out-in">
          <componentAchieveSearch v-show="componentId == 23"></componentAchieveSearch>
          </transition>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</div>
</template>

<script>
import componentInfoView from './info-view.vue'
import componentInfoModify from './info-modify.vue'
import componentPlanOverview from './plan-overview.vue'
import componentPlanWrite from './plan-write.vue'
import componentPlanSearch from './plan-search.vue'
import componentAchieveOverview from './achieve-overview.vue'
import componentAchieveWrite from './achieve-write.vue'
import componentAchieveSearch from './achieve-search.vue'
import accountApi from '../api/accountApi'
import infoApi from '../api/infoApi'
import planApi from '../api/planApi'
import achieveApi from '../api/achieveApi'

export default {
  name: 'home',
  created () {
    this.getInfo()
  },
  data () {
    return {
      tel: '13608089849',
      name: 'user',
      email: '1213814232@qq.com',
      tagId: 0,
      componentId: 0
    }
  },
  components: {
    componentInfoView,
    componentInfoModify,
    componentPlanOverview,
    componentPlanWrite,
    componentPlanSearch,
    componentAchieveOverview,
    componentAchieveWrite,
    componentAchieveSearch
  },
  methods: {
    getInfo () {
      this.name = '曾宇' // test
      this.email = '1213814232@qq.com' // test

      infoApi.info(this.tel).then(function (response) {
        if (response.data.result === true) {
          this.name = response.data.name
          this.email = response.data.email
        }
      })
      planApi.plan(this.tel).then(function (response) {
        if (response.data.result === true) {
          this.plan = response.data.plan
        }
      })
      achieveApi.achieve(this.tel).then(function (response) {
        if (response.data.result === true) {
          this.achieve = response.data.achieve
        }
      })
    },
    clickTopNav: function (name) {
      switch (name) {
        case '0-1':
          this.componentId = 1
          break
        case '0-2':
          this.clickHelp()
          break
        case '0-3':
          this.clickQuit()
          break
        default:
      }
    },
    clickFlyme: function () {
      window.open('https://www.flyme.cn/')
    },
    clickHelp: function () {
      window.open('https://github.com/flymestudio/FlymeStudio-web')
    },
    clickQuit: function () {
      this.$Message.success('Success!')
      this.$router.push('/login')
      let _this = this
      accountApi.quit(this.tel).then(function (response) {
        if (response.data.result === true) {
          _this.$Message.success('Success!')
          this.$router.push('/login')
        } else {
          _this.$Message.error('Fail!')
        }
      })
    },
    clickLeftNav: function (name) {
      this.componentId = name
    }
  }
}
</script>

<style scoped>
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotateY(0);
    -moz-transform   : rotateY(0);
    -o-transform     : rotateY(0);
    -ms-transform    : rotateY(0);
    transform        : rotateY(0);
  }

  30% {
    -webkit-transform: rotateY(-360deg);
    -moz-transform   : rotateY(-360deg);
    -o-transform     : rotateY(-360deg);
    -ms-transform    : rotateY(-360deg);
    transform        : rotateY(-360deg);
  }

  50% {
    -webkit-transform: rotateY(-360deg);
    -moz-transform   : rotateY(-360deg);
    -o-transform     : rotateY(-360deg);
    -ms-transform    : rotateY(-360deg);
    transform        : rotateY(-360deg);
  }

  80% {
    -webkit-transform: rotateY(0);
    -moz-transform   : rotateY(0);
    -o-transform     : rotateY(0);
    -ms-transform    : rotateY(0);
    transform        : rotateY(0);
  }

  100% {
    -webkit-transform: rotateY(0);
    -moz-transform   : rotateY(0);
    -o-transform     : rotateY(0);
    -ms-transform    : rotateY(0);
    transform        : rotateY(0);
  }
}

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

.layout {
  border       : 1px solid #d7dde4;
  background   : #f5f7f9;
  position     : relative;
  border-radius: 4px;
  overflow     : hidden;
}

.layout-logo {
  width            : 50px;
  height           : 50px;
  background-image : url("https://cloud-res.mzres.com/resources/sync/images/flymelogo144.png");
  background-repeat: no-repeat;
  background-size  : cover;
  border-radius    : 3px;
  float            : left;
  position         : relative;
  top              : 5px;
  left             : 5px;
  -webkit-animation: rotate 8s infinite linear;
  -moz-animation   : rotate 8s infinite linear;
  -o-animation     : rotate 8s infinite linear;
  -ms-animation    : rotate 8s infinite linear;
  transition       : rotate 8s infinite linear;
  cursor           : pointer;
}

.layout-nav {
  width : 340px;
  margin: 0 0 0 auto;
}

.menu {
  z-index: 5;
}
</style>
