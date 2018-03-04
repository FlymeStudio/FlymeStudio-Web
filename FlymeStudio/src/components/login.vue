<template>
<div class="div-outer">
  <div class="div-login">
    <div><img src="https://cloud-res.mzres.com/resources/sync/images/flymelogo144.png">
    </div>
    <form class="form-login" onsubmit="">
      <input type="email|tel" placeHolder="Email or tel" v-model="id" />
      <input type="password" placeHolder="Password" v-model="password" />
      <button class="btn-login" @click="login">Sign In</button>
    </form>
    <div class="div-others">
      <div class="div-a" float="left" style="margin-right:60px;" @click="register">Sign Up</div>
      <div class="div-a" float="right" style="margin-left:60px;" @click="retrieve">Retrieve</div>
    </div>
  </div>
</div>
</template>

<script>
import loginApi from '../api/loginApi'

export default {
  name: 'login',
  data () {
    return {
      id: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      this.$router.push('/main')
      loginApi.login(this.id, this.password)
        .then(function (response) {
          if (response.data.result === true) {
            let _this = this
            let loginInfo = {
              id: _this.id,
              password: _this.password
            }
            _this.$store.dispatch('doLogin', loginInfo)
            _this.$router.push('/main')
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

<style scoped >
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
  margin-top       : 10px;
  -webkit-animation: rotate 8s infinite linear;
  -moz-animation   : rotate 8s infinite linear;
  -o-animation     : rotate 8s infinite linear;
  -ms-animation    : rotate 8s infinite linear;
  transition       : rotate 8s infinite linear;
}

.form-login {
  width     : auto;
  height    : auto;
  padding   : 40px;
  margin-top: 20px;
  display   : block;
}

.form-login input {
  width        : 235px;
  height       : 35px;
  margin-top   : 10px;
  border       : 2px solid #1788e8;
  border-radius: 5px;
  padding      : 0 5px;
  font-size    : 18px;
}

.btn-login {
  width           : 250px;
  height          : 42px;
  margin-top      : 15px;
  font-weight     : bold;
  color           : white;
  background-color: #1788e8;
  border          : none;
  border-radius   : 5px;
  cursor          : pointer;
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
