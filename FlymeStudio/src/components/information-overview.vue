<template>
<div id="information-overview">
  <Menu class="menu" width="auto">
    <MenuItem class="menu-item" name="record">
    <Icon class="icon-item" type="log-in" size=18></Icon>
    {{ record }}
    </MenuItem>
    <MenuItem class="menu-item" name="tel">
    <Icon class="icon-item" type="ios-telephone" size=18></Icon>
    {{ tel }}
    </MenuItem>
    <MenuItem class="menu-item" name="email">
    <Icon class="icon-item" type="email" size=18></Icon>
    {{ email }}
    </MenuItem>
  </Menu>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'information-overview',
  created () {
    this.getInfo()
  },
  data () {
    return {
      tel: '',
      email: '',
      record: ''
    }
  },
  methods: {
    getInfo () {
      this.tel = '13608089849'
      this.email = '1213814232@qq.com'
      this.record = '' + new Date()
    }
  }
}
</script>

<style scoped>
.menu {
  z-index: 5;
}

.menu-item {
  cursor: default;
}

.icon-item{
 width: 18px;
 text-align: center;
 margin-right: 10px;
}

</style>
