<template>
<div>
  <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav" :active-name="componentId">
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
  name: 'left-nav',
  created () {
    this.componentId = this.activeName
    console.log('activeName:' + this.activeName)
    console.log('componentId:' + this.componentId)
  },
  props: [
    'activeName'
  ],
  data () {
    return {
      componentId: 1
    }
  },
  methods: {
    clickLeftNav: function (name) {
      this.componentId = name
    }
  }
}
</script>

<style scoped>
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
