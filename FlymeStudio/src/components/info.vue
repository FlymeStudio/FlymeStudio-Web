<template>
<div id="info">
  <div class="div-item">
    <img class="img-info" src="../assets/tel.jpg">
    <span class="span-info">{{ tel }}</span>
  </div>
  <div class="div-item">
    <img class="img-info" src="../assets/email.jpg">
    <span class="span-info">{{ email }}</span>
  </div>
  <div class="div-item">
    <img class="img-info" src="../assets/login.jpg">
    <span class="span-info">{{ login }}</span>
  </div>
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
      this.login = new Date()
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
