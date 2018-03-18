<template>
<div id="project-search">
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
</div>
</template>

<script type="text/javascript">
export default{
  name: 'project-search',
  data () {
    return {
      currentType: '1'
    }
  },
  created () {
    this.clickTag('1')
  },
  methods: {
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
