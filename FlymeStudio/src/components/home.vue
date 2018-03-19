<template>
<div class="layout">
  <Layout>
    <Header>
      <topNav></topNav>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName=""></leftNav>
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
import topNav from './component-topnav.vue'
import leftNav from './component-leftnav.vue'
import componentFooter from './component-footer.vue'

export default {
  name: 'home',
  created () {
  },
  data () {
    return {
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
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
