<template>
<div class="layout">
  <Layout>
    <Header>
      <topNav></topNav>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="22"></leftNav>
      </Sider>
      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
          <Spin style="z-index:10;" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          Function not available
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

export default{
  name: 'summary-create',
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

</style>
