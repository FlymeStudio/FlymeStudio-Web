<template>
<div>
  <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav" :active-name="componentId" :open-names="['0', '10', '20']">

    <Submenu name="0">
      <template slot="title">
        <Icon type="person" size=18></Icon>
        <span class="span-menu-item">Information</span>
      </template>
      <MenuItem name="1">Overview</MenuItem>
      <MenuItem name="2">Modify</MenuItem>
      <MenuItem name="3">Teamwork</MenuItem>
    </Submenu>

    <Submenu name="10">
      <template slot="title">
        <Icon type="clipboard" size=18></Icon>
        <span class="span-menu-item">Project</span>
      </template>
      <MenuItem name="11">Overview</MenuItem>
      <MenuItem name="12">Create</MenuItem>
      <MenuItem name="13">Search</MenuItem>
    </Submenu>

    <Submenu name="20">
      <template slot="title">
        <Icon type="document-text" size=18></Icon>
        <span class="span-menu-item">Summary</span>
      </template>
      <MenuItem name="21">Overview</MenuItem>
      <MenuItem name="22">Create</MenuItem>
      <MenuItem name="23">Search</MenuItem>
    </Submenu>

  </Menu>
</div>
</template>

<script>
export default {
  name: 'component-nav-left',
  created () {
    this.componentId = this.activeName
  },
  props: [
    'activeName'
  ],
  data () {
    return {
      componentId: '1'
    }
  },
  methods: {
    clickLeftNav: function (name) {
      switch (name) {
        case '1':
          this.$router.push('/information/overview')
          break
        case '2':
          this.$router.push('/information/modify')
          break
        case '3':
          this.$router.push('/information/teamwork')
          break
        case '11':
          this.$router.push('/project/overview')
          break
        case '12':
          this.$router.push('/project/create')
          break
        case '13':
          this.$router.push('/project/search')
          break
        case '21':
          this.$router.push('/summary/overview')
          break
        case '22':
          this.$router.push('/summary/create')
          break
        case '23':
          this.$router.push('/summary/search')
          break
        default:
          this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped>
.menu {
  z-index: 5;
}

.span-menu-item {
  font-weight: bold;
  font-size  : 16px;
}

.span-item {
  font-size: 16px;
}
</style>
