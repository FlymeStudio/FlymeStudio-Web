<template>
<div class="div-outer">
  <div class="div-login">
    <div><img class="img-flyme"  src="https://cloud-res.mzres.com/resources/sync/images/flymelogo144.png" @click="flyme">
    </div>
    <form class="form-login" onsubmit="">
      <Input class="input-login" type="email|tel" placeholder="Email or tel" v-model="id" size="large" clearable/>
      <Input class="input-login" type="password" placeholder="Password" v-model="password" size="large" clearable/>
      <Button class="btn-login" @click="login" size="large">Sign In</Button>
    </form>
    <div class="div-others">
      <div class="div-a" float="left" style="margin-right:60px;" @click="register">Sign Up</div>
      <div class="div-a" float="right" style="margin-left:60px;" @click="retrieve">Retrieve</div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import accountApi from '../api/accountApi'

export default {
  name: 'login',
  data () {
    return {
      id: '',
      password: ''
    }
  },
  methods: {
    flyme: function () {
      window.open('https://www.flyme.cn/')
    },
    login: function () {
      this.$router.push('/home')
      let _this = this
      accountApi.login(this.id, this.password)
        .then(function (response) {
          if (response.data.result === true) {
            // let loginInfo = {
            //   id: _this.id,
            //   password: _this.password
            // }
            // _this.$store.dispatch('doLogin', loginInfo)
            _this.$router.push('/home')
          }
        })
    },
    register: function () {
      this.$router.push('/register')
    },
    retrieve: function () {
      this.$router.push('/retrieve')
    }
  }
}
</script>

<style scoped>
.div-outer {
  width          : 100%;
  height         : 100%;
  display        : flex;
  display        : -webkit-flex;
  position       : fixed;
  align-items    : center;
  justify-content: center;
  text-align     : center;
  overflow-y     : auto;
}

.div-login {
  width         : 400px;
  height        : auto;
  margin        : auto 40px;
  padding-bottom: 60px;
}

.div-login img {
  margin-top: 10px;
}

.form-login {
  width     : auto;
  height    : auto;
  padding   : 40px;
  margin-top: 20px;
  display   : block;
}

.input-login {
  width     : 240px;
  height    : 35px;
  margin-top: 10px;
}

.btn-login {
  width           : 240px;
  height          : 42px;
  margin-top      : 25px;
  font-weight     : bold;
  color           : white;
  background-color: #1788e8;
  font-size       : 20px;
}

.div-others {
  width         : 100%;
  margin-top    : 10px;
  font-weight   : bold;
  margin-bottom : 10px;
  padding-bottom: 40px;
}

.div-a {
  width          : auto;
  display        : inline-block;
  color          : #1788e8;
  cursor         : pointer;
  font-size      : 18px;
  text-decoration: underline;
}
</style>
