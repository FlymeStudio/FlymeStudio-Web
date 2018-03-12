<template>
<div id="info">
  <Menu width="auto">
    <MenuItem>
    <Icon type="ios-telephone"></Icon>
    {{ tel }}
    </MenuItem>
    <MenuItem>
    <Icon type="email"></Icon>
    {{ email }}
    </MenuItem>
    <MenuItem>
    <Icon type="log-in"></Icon>
    {{ login }}
    </MenuItem>
  </Menu>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'info',
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
.div-item {
  padding    : 10px;
  align-items: center;
  height     : auto;
  display    : flex;
  display    : -webkit-flex;
}

.img-info {
  height       : 30px;
  width        : 30px;
  margin-right : 10px;
  border-radius: 15px;
}

.span-info {
  color      : #1788e8;
  font-weight: bold;
  font-size  : 20px;
}
</style>
