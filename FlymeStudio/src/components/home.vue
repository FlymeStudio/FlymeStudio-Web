<template>
<div class="layout">
  <Layout>
    <Header>
      <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">
        <div class="layout-logo" @click="clickFlyme"></div>
        <div class="layout-title">Flyme Studio</div>
        <div class="layout-nav">
          <MenuItem name="0-1">
          <Icon class="item-icon" type="person" size="18"></Icon>
          {{ name }}
          </MenuItem>
          <MenuItem name="0-2">
          <Icon class="item-icon" type="help" size="18"></Icon>
          Help
          </MenuItem>
          <MenuItem name="0-3">
          <Icon class="item-icon" type="log-out" size="18"></Icon>
          Sign out
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav">
          <Submenu name="0">
            <template slot="title">
              <Icon type="person" size="18"></Icon>
                Info
            </template>
            <MenuItem name="1">View</MenuItem>
            <MenuItem name="2">Modify</MenuItem>
          </Submenu>
          <Submenu name="10">
            <template slot="title">
              <Icon type="clipboard" size="18"></Icon>
                Plan
            </template>
            <MenuItem name="11">Overview</MenuItem>
            <MenuItem name="12">Write</MenuItem>
            <MenuItem name="13">Search</MenuItem>
          </Submenu>
          <Submenu name="20">
            <template slot="title">
              <Icon type="document-text" size="18"></Icon>
                Achieve
            </template>
            <MenuItem name="21">Overview</MenuItem>
            <MenuItem name="22">Write</MenuItem>
            <MenuItem name="23">Search</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
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
    <componentFooter></componentFooter>
    <BackTop></BackTop>
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
import componentFooter from './component-footer.vue'
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
    componentAchieveSearch,
    componentFooter
  },
  methods: {
    getInfo () {
      this.name = '曾宇' // test
      this.email = '1213814232@qq.com' // test
      let _this = this
      infoApi.info(this.tel).then(function (response) {
        if (response.data.result === true) {
          _this.name = response.data.name
          _this.email = response.data.email
        }
      })
      planApi.plan(this.tel).then(function (response) {
        if (response.data.result === true) {
          _this.plan = response.data.plan
        }
      })
      achieveApi.achieve(this.tel).then(function (response) {
        if (response.data.result === true) {
          _this.achieve = response.data.achieve
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
      this.$Message.success('Sign out successful!')
      this.$router.push('/login')
      let _this = this
      accountApi.quit(this.tel).then(function (response) {
        if (response.data.result === true) {
          _this.$Message.success('Sign out successful!')
          _this.$router.push('/login')
        } else {
          _this.$Message.error('Sign out failed!')
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

</style>
