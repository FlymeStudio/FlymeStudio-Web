<template>
<div id="info">
  <Menu width="auto">
    <MenuItem class="menu-item" name="tel">
    <Icon type="ios-telephone" size="18"></Icon>
    {{ tel }}
    </MenuItem>
    <MenuItem class="menu-item" name="email">
    <Icon type="email" size="18"></Icon>
    {{ email }}
    </MenuItem>
    <MenuItem class="menu-item" name="login">
    <Icon type="log-in" size="18"></Icon>
    {{ login }}
    </MenuItem>
  </Menu>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'info-view',
  created () {
    this.getInfo()
  },
  data () {
    return {
      tel: '',
      email: '',
      login: ''
    }
  },
  methods: {
    getInfo () {
      this.tel = '13608089849'
      this.email = '1213814232@qq.com'
      this.login = '' + new Date()
    }
  }
}
</script>

<style scoped>
.menu-item {
  cursor: default;
}
</style>
