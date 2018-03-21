<template>
<div class="layout">
  <Layout>

    <Header>
      <topNav></topNav>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="3"></leftNav>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">

          <Menu class="menu" mode="horizontal" theme="light" active-name="0" @on-select="clickTag">
            <MenuItem class="menu-item" name="0">
            <Icon type="ios-people" size=20></Icon>
            My team
            </MenuItem>
            <MenuItem class="menu-item" name="1">
            <Icon type="android-person-add" size=20></Icon>
            Join team
            </MenuItem>
            <MenuItem class="menu-item" name="2">
            <Icon type="plus-circled" size=20></Icon>
            Create team
            </MenuItem>
          </Menu>

          <Layout>
            <Content :style="{padding: '15px 0', minHeight: '280px', background: '#fff'}">
              <myTeam v-show="currentType == 0"></myTeam>
              <joinTeam v-show="currentType == 1"></joinTeam>
              <createTeam v-show="currentType == 2"></createTeam>
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

<script type="text/javascript">
import topNav from './component-topnav.vue'
import leftNav from './component-leftnav.vue'
import componentFooter from './component-footer.vue'
import myTeam from './component-team-my.vue'
import joinTeam from './component-team-join.vue'
import createTeam from './component-team-create.vue'

export default{
  name: 'information-teamwork',
  created () {
    this.clickTag('0')
  },
  data () {
    return {
      currentType: '0'
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter,
    myTeam,
    joinTeam,
    createTeam
  },
  methods: {
    clickTag: function (name) {
      this.currentType = name
    }
  }
}
</script>

<style scoped>
.menu{
  z-index:5;
}

</style>
