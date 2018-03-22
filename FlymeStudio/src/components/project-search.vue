<template>
<div class="layout">
  <Layout>

    <Header>
      <topNav></topNav>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="23"></leftNav>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">

          <Spin class="spin" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          <Menu class="menu" mode="horizontal" theme="light" @on-select="clickTag" active-name="1">
            <MenuItem class="menu-item" name="1">
            <Icon type="bookmark" size=18></Icon>
            Whole project
            </MenuItem>
            <MenuItem class="menu-item" name="2">
            <Icon type="bookmark" size=18></Icon>
            Only goal
            </MenuItem>
          </Menu>

          <Layout>
            <Content :style="{padding: '15px 0', minHeight: '280px', background: '#fff'}">
              <div v-if="currentType == 1">
                Function not available
              </div>
              <div v-if="currentType == 2">
                Function not available
              </div>
            </Content>
          </Layout>

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

export default{
  name: 'project-search',
  created () {
    this.getInfo()
    this.clickTag('1')
  },
  data () {
    return {
      currentType: '1',
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
      let name = this.$store.state.user.userInfo.name
      if (name === null) {
        this.$router.push('/')
      } else {
        this.info = this.$store.state.user.userInfo
      }
    },
    clickTag: function (name) {
      this.currentType = name
    }
  }
}
</script>

<style scoped>
.menu {
  z-index: 5;
}

.menu-item {
  text-align: center;
}
</style>
