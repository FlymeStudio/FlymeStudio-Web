<template>
<div class="layout">
  <Layout>

    <Header>
      <componentNavTop></componentNavTop>
    </Header>

    <Layout>
      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <componentNavLeft activeName=""></componentNavLeft>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
          <Alert show-icon>
            <Icon type="plane" slot="icon"></Icon>
            <template slot="desc">
              <div class="div-content">
                Make work more efficient
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

<script>
import componentNavTop from './component-nav-top.vue'
import componentNavLeft from './component-nav-left.vue'
import componentFooter from './component-footer.vue'

export default {
  name: 'home',
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
      }
    }
  },
  components: {
    componentNavTop,
    componentNavLeft,
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
    }
  }
}
</script>

<style scoped>
.div-content {
  width      : auto;
  height     : auto;
  display    : block;
  position   : relative;
  margin     : auto;
  align-items: center;
  font-weight: bold;
  font-size  : 18px;
}
</style>
