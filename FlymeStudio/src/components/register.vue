<template>
<div>
  <ul class="div-top">
    <li><img class="img-flyme"  src="https://cloud-res.mzres.com/resources/sync/images/flymelogo144.png" @click="flyme"></li>
    <li><span style="font-size:30px;" @click="flyme">Flyme</span></li>
    <li class="li-right"><span @click="retrieve">Retrieve</span></li>
    <li class="li-right"><span @click="login">Sign In</span></li>
  </ul>
  <div class="div-bg">
    <form class="div-content-register" v-show="!isResultView">
      <div class="div-item">
        <input type="text" placeHolder="Name" v-model.trim="name" />
        <div v-bind:class="['input-state', { correct: isNameCorrect }]" />
      </div>
      <div class="div-item">
        <input type="tel" placeHolder="Tel" v-model.trim="tel" />
        <div v-bind:class="['input-state', { correct: isTelCorrect }]" />
      </div>
      <div class="div-item">
        <input type="email" placeHolder="Email" v-model.trim="email" />
        <div v-bind:class="['input-state', { correct: isEmailCorrect }]" />
      </div>
      <div class="div-item">
        <input type="password" placeHolder="Password" v-model.trim="password" />
        <div v-bind:class="['input-state', { correct: isPasswordCorrect }]" />
      </div>
      <div class="div-item">
        <input type="password" placeHolder="Confirm" v-model.trim="confirm" />
        <div v-bind:class="['input-state', { correct: isConfirmCorrect }]" />
      </div>
      <button v-bind:class="[{ 'btn-correct': isDataCorrect }, 'btn-sign']" @click="register">Sign Up</button>
      <div class="div-message" style="color:red;" v-show="isRegisterCallback">{{ messageFail }}</div>
    </form>
    <div class="div-content-result" v-show="isResultView">
      <div class="div-message" style="color:green;">{{ messageSuccess }}</div>
      <button class="btn-sign" style="background-color:#1788e8;cursor:pointer;" @click="login">Sign In</button>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import registerApi from '../api/registerApi'

export default {
  name: 'register',
  data () {
    return {
      name: '曾宇 ',
      tel: '13608089849 ',
      email: '1213814232@qq.com ',
      password: '1234567',
      confirm: '1234567',
      isResultView: false,
      isNameCorrect: false,
      isTelCorrect: false,
      isEmailCorrect: false,
      isPasswordCorrect: false,
      isConfirmCorrect: false,
      isDataCorrect: false,
      isRegisterCallback: false,
      messageFail: 'Sign up failed, please retry.',
      messageSuccess: 'Sign up successful, sign in now?'
    }
  },
  watch: {
    name: function (newValue) {
      let reg = /^[\u4E00-\u9FA5]{2,4}$/
      if (reg.test(newValue)) {
        this.isNameCorrect = true
      } else {
        this.isNameCorrect = false
      }
    },
    tel: function (newValue) {
      let reg = /^(13[0-9]{9})|(14[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})$/
      if (reg.test(newValue)) {
        this.isTelCorrect = true
      } else {
        this.isTelCorrect = false
      }
    },
    email: function (newValue) {
      let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]{2,})+(\.[a-zA-Z0-9_-]{2,})+/
      if (reg.test(newValue)) {
        this.isEmailCorrect = true
      } else {
        this.isEmailCorrect = false
      }
    },
    password: function (newValue) {
      if (newValue !== '' && newValue.length >= 6) {
        this.isPasswordCorrect = true
      } else {
        this.isPasswordCorrect = false
      }
    },
    confirm: function (newValue) {
      if (newValue === this.password) {
        this.isConfirmCorrect = true
        this.isDataCorrect = this.isNameCorrect & this.isTelCorrect & this.isEmailCorrect & this.isConfirmCorrect
      } else {
        this.isConfirmCorrect = false
        this.isDataCorrect = false
      }
    }
  },
  methods: {
    flyme: function () {
      window.open('https://www.flyme.cn/')
    },
    login: function () {
      this.$router.push('/login')
    },
    retrieve: function () {
      this.$router.push('/retrieve')
    },
    register: function () {
      if (this.isDataCorrect) {
        registerApi.register(this.name, this.tel, this.email, this.password)
          .then(function (response) {
            if (response.data.result === true) {
              this.isResultView = true
            } else {
              this.isResultView = false
              this.isRegisterCallback = true
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.div-bg {
  width                : 100%;
  height               : 100%;
  min-height           : 500px;
  position             : absolute;
  background-color     : #1788e8;
  background-image     : url("../assets/banner.jpg");
  background-position  : center bottom;
  background-repeat    : no-repeat;
  background-attachment: fixed;
  background-size      : cover;
}

.div-content-register {
  width      : auto;
  height     : auto;
  position   : absolute;
  margin-top : 80px;
  margin-left: 10%;
  display    : block;
}

.div-item {
  width          : 280px;
  height         : auto;
  margin-top     : 10px;
  align-items    : center;
  justify-content: center;
  display        : flex;
}

.div-item input {
  width        : 215px;
  height       : 35px;
  padding      : 0 10px;
  border       : 3px solid #1788e8;
  border-radius: 10px;
  font-size    : 18px;
  outline      : none;
}

.input-state {
  width        : 10px;
  height       : 10px;
  margin       : auto 5px;
  border-radius: 10px;
  background   : red;
}

.correct {
  background: green;
}

.btn-sign {
  margin-left     : 10px;
  width           : 240px;
  height          : 42px;
  margin-top      : 40px;
  font-weight     : bold;
  color           : white;
  background-color: grey;
  cursor          : wait;
  border          : none;
  border-radius   : 5px;
  font-size       : 20px;
}

.btn-correct {
  background-color: #1788e8;
  cursor          : pointer;
}

.div-message {
  margin-top : 30px;
  font-size  : 20px;
  padding    : 0 10px;
  font-weight: bold;
}

.div-content-result {
  width      : auto;
  height     : auto;
  position   : absolute;
  margin-top : 80px;
  margin-left: 10%;
  display    : block;
}
</style>
