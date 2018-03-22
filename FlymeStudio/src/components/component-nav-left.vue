<template>
<div>
  <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav" :active-name="componentId" :open-names="openNames">

    <Submenu name="0">
      <template slot="title">
        <Icon class="icon-item" type="person" size=18></Icon>
        <span class="span-menu-item">Information</span>
      </template>
      <MenuItem name="1">Overview</MenuItem>
      <MenuItem name="2">Modify</MenuItem>
    </Submenu>

    <Submenu name="10">
      <template slot="title">
        <Icon class="icon-item" type="ios-people" size=18></Icon>
        <span class="span-menu-item">Teamwork</span>
      </template>
      <MenuItem name="11">Overview</MenuItem>
      <MenuItem name="12">Join</MenuItem>
      <MenuItem name="13">Create</MenuItem>
    </Submenu>

    <Submenu name="20">
      <template slot="title">
        <Icon class="icon-item" type="clipboard" size=18></Icon>
        <span class="span-menu-item">Project</span>
      </template>
      <MenuItem name="21">Overview</MenuItem>
      <MenuItem name="22">Create</MenuItem>
      <MenuItem name="23">Search</MenuItem>
    </Submenu>

    <Submenu name="30">
      <template slot="title">
        <Icon class="icon-item" type="document-text" size=18></Icon>
        <span class="span-menu-item">Summary</span>
      </template>
      <MenuItem name="31">Overview</MenuItem>
      <MenuItem name="32">Create</MenuItem>
      <MenuItem name="33">Search</MenuItem>
    </Submenu>

  </Menu>
</div>
</template>

<script>
export default {
  name: 'component-nav-left',
  created () {
    this.componentId = this.activeName
    this.openSubMenu()
  },
  props: [
    'activeName'
  ],
  data () {
    return {
      componentId: '',
      openNames: []
    }
  },
  methods: {
    openSubMenu () {
      switch (this.componentId) {
        case '1':
        case '2':
          this.openNames = ['0']
          break
        case '11':
        case '12':
        case '13':
          this.openNames = ['10']
          break
        case '21':
        case '22':
        case '23':
          this.openNames = ['20']
          break
        case '31':
        case '32':
        case '33':
          this.openNames = ['30']
          break
        default:
          this.openNames = []
      }
    },
    clickLeftNav: function (name) {
      switch (name) {
        case '1':
          this.$router.push('/information/overview')
          break
        case '2':
          this.$router.push('/information/modify')
          break
        case '11':
          this.$router.push('/teamwork/overview')
          break
        case '12':
          this.$router.push('/teamwork/join')
          break
        case '13':
          this.$router.push('/teamwork/create')
          break
        case '21':
          this.$router.push('/project/overview')
          break
        case '22':
          this.$router.push('/project/create')
          break
        case '23':
          this.$router.push('/project/search')
          break
        case '31':
          this.$router.push('/summary/overview')
          break
        case '32':
          this.$router.push('/summary/create')
          break
        case '33':
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
